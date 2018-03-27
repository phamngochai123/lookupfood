import React, { Component } from 'react';
import { View, Text, Dimensions, FlatList, Image, TextInput, AsyncStorage, Alert, Button, TouchableOpacity, Keyboard } from 'react-native';
import { Avatar, List, ListItem, Icon } from 'react-native-elements';
import moment from 'moment';
import Touch from 'react-native-touch';

import config from '../../../config/config';
import actions from '../../../app-actions/Actions.js';

import Comment from './Comment';
import BottomItem from './BottomItem';
import ImageItem from './ImageItem';
import HeaderItem from './HeaderItem';

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

export default class Item extends Component {

    constructor(props) {
        super(props);
        this.state = {
            region: {
                latitude: 0,
                longitude: 0,
            },
            distance: "loading...",
            detailComment: '',
            height: 40,
            isNullComment: true,
            isLogin: false,
            checkPostComment: false,
            star: 0
        }
    }

    configApi = {
        apiPostComment: config.api_port ? config.api_url + ":" + config.api_port + config.apiPost + "comment" : config.api_url + config.apiPost + "comment",
        apiGetRatting: config.api_port ? config.api_url + ":" + config.api_port + config.apiGet + "rattingTotal/" + this.props.item.id : config.api_url + config.apiGet + "rattingTotal/" + this.props.item.id
    }

    componentWillMount() {
        let { item } = this.props;
        let { latitude, longitude } = this.props.currentPosition;
        actions.getDirections("" + latitude + "," + longitude + "","" + item.latitude + "," + item.longitude + "", this);
        // navigator.geolocation.getCurrentPosition((position) => {
        //     let { latitude, longitude } = position.coords;
        //     actions.getDirections("" + latitude + ", " + longitude + "", "" + item.latitude + ", " + item.longitude + "", this);
        // }, (error) => console.log(error), { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 })
    }

    componentWillReceiveProps(nextProps) {
        let { item } = this.props;
        let { latitude, longitude } = nextProps.currentPosition;
        actions.getDirections("" + latitude + "," + longitude + "","" + item.latitude + "," + item.longitude + "", this);
    }

    componentDidMount() {
        actions.getStar(this.configApi.apiGetRatting, this);
    }

    isRatting() {
        actions.getStar(this.configApi.apiGetRatting, this);
    }

    render() {
        let { open } = this.props.item;
        let { close } = this.props.item;
        let hourOpen = open.split(":")[0];
        let minuteOpen = open.split(":")[1];
        let hourClose = close.split(":")[0];
        let minuteClose = close.split(":")[1];
        let currentHour = moment(new Date()).format("HH");
        let currentMinute = moment(new Date()).format("mm");
        let checkOpen = true;
        if (currentHour < hourOpen || currentHour > hourClose) {
            checkOpen = false;
        }

        if (currentHour == hourOpen && currentMinute < minuteOpen || currentHour == hourClose && currentMinute > minuteClose) {
            checkOpen = false;
        }

        return (
            <View style={{ backgroundColor: '#fff', paddingBottom: 5, marginTop: 5, flex: 1 }}>
                <Touch style={{ borderBottomWidth: 1, borderBottomColor: '#EEEEEE', paddingBottom: 6 }} activeOpacity={0.7} onPress={() => this.props.navigate("InfoTabs", { currentPosition :this.props.currentPosition, socket: this.props.socket, _handleRatting: this.isRatting.bind(this), star: this.state.star, item: this.props.item, distance: this.state.distance, isLogin: this.props.isLogin, checkSave: this.props.checkSave, navigate: this.props.navigate })}>
                    <HeaderItem marginTop={6} socket={this.props.socket} star={this.state.star} checkSave={this.props.checkSave} onRefresh={this.props.onRefresh} isLogin={this.props.isLogin} navigate={this.props.navigate} item={this.props.item} distance={this.state.distance} />
                    <View style={{ marginTop: 10, marginBottom: 10, flex: 5 }}>
                        <ImageItem width={width} height={height * 0.25} item={this.props.item} />
                    </View>
                    <View style={{ flex: 2 }}>
                        <Comment currentItem={this.props.currentItem} isPostComment={this.props.isPostComment} checkPostComment={this.state.checkPostComment} idRes={this.props.item.id} />
                    </View>
                    <View style={{ flex: 1 }}>
                        <BottomItem checkOpen={checkOpen} idRes={this.props.item.id} />
                    </View>
                </Touch>
                {
                    this.props.isLogin
                        ?
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <View style={{ flex: 5 }}>
                                <TextInput value={this.state.detailComment} onChangeText={(text) => actions.updateComment(text, this)} multiline={true} onChange={(e) => actions.updateSize(e.nativeEvent.contentSize.height, this)} placeholder="Nhập bình luận..." placeholderTextColor="#dddddd" style={{ width: width * 5 / 6, height: this.state.height }} />
                            </View>
                            {
                                this.state.detailComment !== ''
                                    ?
                                    <TouchableOpacity onPress={() => actions.postComment(this.configApi.apiPostComment, this.props.item.id, this, this.props.socket)} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                        <Icon name="send" color="blue" size={14} type='font-awesome' onPress={() => actions.postComment(this.configApi.apiPostComment, this.props.item.id, this, this.props.socket)} />
                                    </TouchableOpacity>
                                    :
                                    <TouchableOpacity  style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                        <Icon name="send" color="#dddddd" size={14} type='font-awesome'  />
                                    </TouchableOpacity>
                            }

                        </View>
                        :
                        <View></View>
                }

            </View>
        )
    }
}

