import React, { Component } from 'react';
import { View, Text, Dimensions, FlatList, Image, TouchableOpacity, TouchableHighlight, ScrollView } from 'react-native';
import { Avatar, List, ListItem, SearchBar, Header, Icon, SideMenu } from 'react-native-elements';
import Modal from 'react-native-modal';
import _ from 'lodash';
import moment from 'moment';
import Touch from 'react-native-touch';

import Spinner from 'react-native-loading-spinner-overlay';

import config from '../../../config/config';
import actions from '../../../app-actions/Actions.js';
import * as action from '../../../app-actions/index';

import { connect } from 'react-redux';

import Item from '../../cruid/component/Item';
import ItemNear from '../../cruid/component/ItemNear';

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

export default class ListRestaurant extends Component {

    constructor(props) {
        super(props);
        ListRestaurant = this;
        this.state = {
            modalVisible: false,
            dataList: [],
            dataListNear: [],
            isRefresh: true,
            page: 1,
            coords: {
                latitude: 21,
                longitude: 105
            },
            isPostComment: false,
            isRatting: false,
            currentItem: false,
            visible: true,
            count: 1,
            dataCategory: [],
            focus: -1,
            checkCount: -1,
        }
        this.props.screenProps.socket.on("have-new-comment", function (data) {
            ListRestaurant.setState({
                isPostComment: !ListRestaurant.state.isPostComment,
                currentItem: data
            })
        })
    }

    configApi = {
        apiListByCategoryType: config.api_url + ":" + config.api_port + config.apiGet + "restaurantbycategoryType",
        apiCountByCategoryType: config.api_url + ":" + config.api_port + config.apiCount + "restaurantbycategoryType",
        apiListNew: config.api_url + ":" + config.api_port + config.apiGet + "restaurant",
        apiCountNew: config.api_url + ":" + config.api_port + config.apiCount + "restaurant",
        apiList: config.api_url + ":" + config.api_port + config.apiGet + "restaurant/nearByRadius/" + this.props.screenProps.currentPosition.latitude + "/" + this.props.screenProps.currentPosition.longitude + "/5000",
        //apiList: config.api_port ? config.api_url + ":" + config.api_port + config.apiGet + "restaurant" : config.api_url + config.apiGet + "restaurant",
        apiCount: config.api_port ? config.api_url + ":" + config.api_port + config.apiCount + "restaurant/nearByRadius/" + this.props.screenProps.currentPosition.latitude + "/" + this.props.screenProps.currentPosition.longitude + "/5000" : config.api_url + config.apiCount + "restaurant/nearByRadius" + this.props.screenProps.currentPosition.latitude + "/" + this.props.screenProps.currentPosition.longitude + "/1000",
        apiGetCategory: config.api_url + ":" + config.api_port + config.apiGet + "categoryOfRestaurant",
    }

    navigate = this.props.navigation.navigate;

    async componentDidMount() {
        actions.loadData(this.configApi.apiList + "/0/" + config.limit, this, 'refresh');
        actions.getCount(this.configApi.apiCount, this);
        actions.getCategory(this.configApi.apiGetCategory, this);
        //actions.loadData(this.configApi.apiList + "/nearByRadius/" + this.props.screenProps.currentPosition.latitude + "/" + this.props.screenProps.currentPosition.longitude + "/250000", this, 'near');
    }

    async componentWillReceiveProps(nextProps) {
        if (this.state.focus == -1 && (nextProps.screenProps.currentPosition.latitude != this.state.coords.latitude || nextProps.screenProps.currentPosition.longitude != this.state.coords.longitude)) {
            this.state.coords = {
                latitude: nextProps.screenProps.currentPosition.latitude,
                longitude: nextProps.screenProps.currentPosition.longitude
            }

            let apiList = config.api_url + ":" + config.api_port + config.apiGet + "restaurant/nearByRadius/" + nextProps.screenProps.currentPosition.latitude + "/" + nextProps.screenProps.currentPosition.longitude + "/5000";
            let apiCount = config.api_url + ":" + config.api_port + config.apiCount + "restaurant/nearByRadius/" + nextProps.screenProps.currentPosition.latitude + "/" + nextProps.screenProps.currentPosition.longitude + "/5000";
            await actions.checkCount(apiCount, this);
            let count = this.state.checkCount;
            if (count) {
                actions.loadData(apiList + "/0/" + config.limit, this, 'refresh');
                actions.getCount(apiCount, this);
            }
            else{
                alert("Không có địa điểm trong bán kính 5 km từ vị trí của bạn, hệ thống sẽ hiển thị danh sách địa điểm mới nhất");
                this.selectCategoryShow(-2);
            }

        }
        if (this.state.focus != -1 && (nextProps.screenProps.currentPosition.latitude != this.state.coords.latitude || nextProps.screenProps.currentPosition.longitude != this.state.coords.longitude)) {
            this.state.coords = {
                latitude: nextProps.screenProps.currentPosition.latitude,
                longitude: nextProps.screenProps.currentPosition.longitude
            }
            this.setState(this.state);
        }

        //actions.loadData(this.configApi.apiList + "/nearByRadius/" + this.props.screenProps.currentPosition.latitude + "/" + this.props.screenProps.currentPosition.longitude + "/250", this, 'near');
    }

    _keyExtractor = (item, index) => item.id;

    _renderItem = ({ item }) => (
        <Item socket={this.props.screenProps.socket} currentItem={this.state.currentItem} isPostComment={this.state.isPostComment} checkSave={this.props.screenProps.checkSave} statusSave={this.props.screenProps.statusSave} onRefresh={this._onRefresh} currentPosition={this.props.screenProps.currentPosition} navigate={this.navigate} isLogin={this.props.screenProps.isLogin} isRefresh={this.state.isRefresh} item={item} />
    );

    // _renderItemNear = ({ item }) => (
    //     <ItemNear navigate={this.navigate} isLogin={this.props.screenProps.isLogin} onRefresh={this._onRefresh} item={item} />
    // );

    _onRefresh() {
        if (this.state.focus == -1) {
            let apiList = config.api_url + ":" + config.api_port + config.apiGet + "restaurant/nearByRadius/" + this.state.coords.latitude + "/" + this.state.coords.longitude + "/5000";
            actions.loadData(apiList + "/0/" + config.limit, this, 'refresh');
        }
        else if (this.state.focus == -2) {
            actions.loadData(this.configApi.apiListNew, this, 'refresh');
            actions.getCount(this.configApi.apiCountNew, this);
        }
        else {
            actions.loadData(this.configApi.apiListByCategoryType + "/" + this.state.focus + "/0/" + config.limit, this, 'refresh');
            actions.getCount(this.configApi.apiCountByCategoryType + "/" + this.state.focus, this);
        }

    }

    _onEndReached() {
        if (this.state.page <= Math.ceil(this.state.count / config.limit)) {
            if (this.state.focus == -1) {
                let apiList = config.api_url + ":" + config.api_port + config.apiGet + "restaurant/nearByRadius/" + this.state.coords.latitude + "/" + this.state.coords.longitude + "/5000";
                actions.loadData(apiList + "/" + config.limit * (this.state.page) + "/" + config.limit, this, 'loadMore');
            }
            else if (this.state.focus == -2) {
                actions.loadData(this.configApi.apiListNew + "/" + config.limit * (this.state.page) + "/" + config.limit, this, 'loadMore');
            }
            else {
                actions.loadData(this.configApi.apiListByCategoryType + "/" + this.state.focus + "/" + this.state.page * config.limit + config.limit, this, 'loadMore');
            }
        }
    }

    searchRestaurant() {
        console.log(1234);
    }

    _handleRatting() {
        this.setState({
            isRatting: !this.state.isRatting
        })
    }

    selectCategoryShow(focus) {
        this.state.focus = focus;
        this.state.modalVisible = false;
        if (focus == -2) {
            actions.loadData(this.configApi.apiListNew + "/0/" + config.limit, this, 'refresh');
            actions.getCount(this.configApi.apiCountNew, this);
        }
        else if (focus == -1) {
            let latitude = this.props.screenProps.currentPosition.latitude != this.state.coords.latitude ? this.props.screenProps.currentPosition.latitude : this.state.coords.latitude;
            let longitude = this.props.screenProps.currentPosition.longitude != this.state.coords.longitude ? this.props.screenProps.currentPosition.longitude : this.state.coords.longitude;
            let apiList = config.api_url + ":" + config.api_port + config.apiGet + "restaurant/nearByRadius/" + latitude + "/" + longitude + "/5000";
            let apiCount = config.api_url + ":" + config.api_port + config.apiCount + "restaurant/nearByRadius/" + latitude + "/" + longitude + "/5000";
            actions.loadData(apiList + "/0/" + config.limit, this, 'refresh');
            actions.getCount(apiCount, this);
        }
        else {
            actions.loadData(this.configApi.apiListByCategoryType + "/" + focus + "/0/" + config.limit, this, 'refresh');
            actions.getCount(this.configApi.apiCountByCategoryType + "/" + focus, this);
        }
    }


    render() {
        let itemShow = [];
        itemShow.push(
            <TouchableOpacity
                onPress={this.state.focus != -1 ? () => this.selectCategoryShow(-1) : () => this.setState({ modalVisible: false })}
                style={{ backgroundColor: this.state.focus == -1 ? 'green' : '#dddddd', justifyContent: 'center', height: 50 }}>
                <Text style={{ marginLeft: 7 }}>Gần tôi (5 km)</Text>
            </TouchableOpacity>
        )
        itemShow.push(
            <TouchableOpacity
                onPress={this.state.focus != -2 ? () => this.selectCategoryShow(-2) : () => this.setState({ modalVisible: false })}
                style={{ marginTop: 5, backgroundColor: this.state.focus == -2 ? 'green' : '#dddddd', justifyContent: 'center', height: 50 }}>
                <Text style={{ marginLeft: 7 }}>Mới nhất</Text>
            </TouchableOpacity>
        )
        this.state.dataCategory.map((data, index) => {
            itemShow.push(
                <TouchableOpacity
                    onPress={this.state.focus != data.id ? () => this.selectCategoryShow(data.id) : () => this.setState({ modalVisible: false })}
                    style={{ backgroundColor: this.state.focus == data.id ? 'green' : '#dddddd', marginTop: 5, justifyContent: 'center', height: 50 }}>
                    <Text style={{ marginLeft: 7 }}>{data.name}</Text>
                </TouchableOpacity>
            )
        })
        return (
            <View>
                <Modal
                    isVisible={this.state.modalVisible}
                    animationIn="slideInUp"
                    animationOut="slideOutDown"
                >
                    <ScrollView style={{ height: height / 2 + 20, backgroundColor: 'white' }}>
                        <Text style={{ textAlign: 'center' }}>Hiển thị theo</Text>
                        {itemShow}
                    </ScrollView>
                </Modal>
                <Spinner animation="fade" visible={this.state.visible} textContent={"Loading..."} textStyle={{ color: '#FFF' }} overlayColor="rgba(0,0,0,0.5)" />
                <View style={{ flexDirection: 'row', width: width, justifyContent: 'center', alignItems: 'center' }}>
                    <Icon
                        raised
                        size={17}
                        name='bars'
                        type='font-awesome'
                        color='#f50'
                        onPress={() => this.setState({ modalVisible: true })} />
                    <Touch style={{ width: width * 0.8 }} onPress={() => this.navigate("SearchTabs", { currentPosition: this.props.screenProps.currentPosition, socket: this.props.screenProps.socket, isLogin: this.props.screenProps.isLogin, checkSave: this.props.screenProps.checkSave, statusSave: this.props.screenProps.statusSave })}>
                        <SearchBar
                            round
                            lightTheme
                            editable={false}
                            placeholder='Tìm kiếm...' />
                    </Touch>
                </View>
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    keyboardShouldPersistTaps="always"
                    style={{ marginBottom: 70 }}
                    data={this.state.dataList}
                    renderItem={this._renderItem}
                    keyExtractor={this._keyExtractor}
                    refreshing={this.state.isRefresh}
                    onRefresh={this._onRefresh.bind(this)}
                    onEndReached={this._onEndReached.bind(this)}
                    onEndReachedThreshold={0.5}
                />
                {/* </View> */}

            </View>
        )
    }
}

