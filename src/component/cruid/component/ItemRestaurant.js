import React, { Component } from 'react';
import { View, Text, Dimensions, FlatList, Image, TextInput, AsyncStorage, Alert, Button, TouchableOpacity } from 'react-native';
import { Avatar, List, ListItem, Icon, Rating } from 'react-native-elements';
import StarRating from 'react-native-star-rating';
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

export default class ItemRestaurant extends Component {

    constructor(props) {
        super(props);
        this.state = {
            item: {},
            region: {
                latitude: 0,
                longitude: 0,
            },
            distance: "loading...",
            isComment: false,
            detailComment: '',
            height: 40,
            isNullComment: true,
            isLogin: false,
            star: 0,
        }
    }

    configApi = {
        apiGetRatting: config.api_port ? this.props.isTabSave ? config.api_url + ":" + config.api_port + config.apiGet + "rattingTotal/" + this.props.item.resId : config.api_url + ":" + config.api_port + config.apiGet + "rattingTotal/" + this.props.item.id : this.props.isTabSave ? config.api_url + config.apiGet + "rattingTotal/" + this.props.item.resId : config.api_url + config.apiGet + "rattingTotal/" + this.props.item.id
    }

    componentDidMount() {
        let { item } = this.props;
        this.state.item = item;
        actions.getDirections("" + this.props.currentPosition.latitude + "," + this.props.currentPosition.longitude + "","" + item.latitude + "," + item.longitude + "", this);
        actions.getStar(this.configApi.apiGetRatting, this);
    }

    componentWillReceiveProps(nextProps){
        let { item } = nextProps;
        this.state.item = item;
        actions.getDirections("" + nextProps.currentPosition.latitude + "," + nextProps.currentPosition.longitude + "","" + item.latitude + "," + item.longitude + "", this);
        actions.getStar(this.configApi.apiGetRatting, this);
    }

    render() {
        let star = this.state.star;
        if (star == null) star = 0;
        return (
            <Touch onPress={() => this.props.navigate("InfoTabs", {  currentPosition :this.props.currentPosition, socket: this.props.socket, checkSave: this.props.checkSave, star: star, isSavePlace: this.props.isSavePlace, isLogin: this.props.isLogin, item: this.props.item, distance: this.state.distance })} onLongPress={this.props.isTabSave ? () => this.props.deleteItem(this.props.item) : () => console.log("1234")}>
                <View style={{ backgroundColor: '#fff', paddingBottom: 5, marginTop: 5, flex: 1, flexDirection: 'row' }}>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Avatar
                            medium
                            source={{ uri: this.props.item ? this.props.item.photoUrl : "https://s3.amazonaws.com/uifaces/faces/twitter/kfriedson/128.jpg" }}
                            onPress={() => console.log("Works!")}
                            activeOpacity={0.7}
                        />
                    </View>
                    <View style={{ flex: 2 }}>
                        <Text numberOfLines={1} style={{ fontSize: 13, fontWeight: 'bold' }}>{this.props.item ? this.props.item.name : "loading..."}</Text>
                        <Text numberOfLines={1} style={{ fontSize: 11, color: '#696969' }}>{this.props.item ? this.props.item.address : "loading..."}</Text>
                    </View>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Text>{this.state.distance}</Text>
                        {/* <Rating
                            imageSize={10}
                            readonly
                            startingValue={parseFloat(star.toFixed(1))}
                        /> */}
                        <StarRating
                            disabled={true}
                            starColor='yellow'
                            maxStars={5}
                            rating={star}
                            starSize={10}
                        />
                    </View>
                </View>
            </Touch>
        )
    }
}

