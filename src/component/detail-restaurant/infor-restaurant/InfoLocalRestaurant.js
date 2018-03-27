import React, { Component } from 'react';
import { View, Text, Image, Alert, FlatList, AsyncStorage, TouchableOpacity, BackHandler, Modal } from 'react-native';
import { Icon, Rating } from 'react-native-elements'
import StarRating from 'react-native-star-rating';
import _ from 'lodash';
import numeral from 'numeral';
import io from 'react-native-socket.io-client';
import Touch from 'react-native-touch';

import config from '../../../config/config';
import actions from '../../../app-actions/Actions';

import ImageItem from '../../cruid/component/ImageItem';
import InfoItem from './InfoItem';

infoMap = [
    {
        name: 'ratting',
        icon: 'star',
        edit: true,
        title: "Đánh giá của bạn "
    },
    {
        name: 'address',
        icon: 'map-marker'
    },
    {
        name: 'distance',
        icon: 'dot-circle-o'
    },
    {
        name: 'prices',
        icon: 'money'
    },
    {
        name: 'time',
        icon: 'clock-o'
    },
    {
        name: 'phone',
        icon: 'phone'
    }
]

export default class InfoRestaurant extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataList: [],
            isRefresh: false,
            distance: 'loading...',
            star: this.props.screenProps.star ? this.props.screenProps.star : 0,
            count: 0,
            itemRatting: {
                id: null,
                star: null
            }
        }
    }

    configApi = {
        apiPostRatting: config.api_port ? config.api_url + ":" + config.api_port + config.apiPost + "ratting" : config.api_url + config.apiPost + "ratting",
        apiGetItem: config.api_port ? config.api_url + ":" + config.api_port + config.apiGet + "info/restaurant/" : config.api_url + config.apiGet + "info/restaurant/",
        apiGetRatting: config.api_port ? this.props.screenProps.isSavePlace ? config.api_url + ":" + config.api_port + config.apiGet + "rattingTotal/" + this.props.screenProps.item.resId : config.api_url + ":" + config.api_port + config.apiGet + "rattingTotal/" + this.props.screenProps.item.id : this.props.screenProps.isSavePlace ? config.api_url + config.apiGet + "rattingTotal/" + this.props.screenProps.item.resId : config.api_url + config.apiGet + "rattingTotal/" + this.props.screenProps.item.id,
        apiCheckRatting: config.api_port ? config.api_url + ":" + config.api_port + config.apiGet + "checkRatting/" : config.api_url + config.apiGet + "checkRatting/",
        apiGetUserRatting: config.api_port ? config.api_url + ":" + config.api_port + config.apiGet + "UserRatting/" : config.api_url + config.apiGet + "UserRatting/",
        apiUpdateRatting: config.api_port ? config.api_url + ":" + config.api_port + config.apiUpdate + "ratting" : config.api_url + config.apiUpdate + "ratting",        
    }

    id = this.props.screenProps.isSavePlace ? this.props.screenProps.item.resId : this.props.screenProps.item.id;

    async componentDidMount() {
        console.log(this.props);
        if (this.props.screenProps.currentPosition) {
            actions.getDirections("" + this.props.screenProps.currentPosition.latitude + ", " + this.props.screenProps.currentPosition.longitude + "", "" + this.props.screenProps.item.latitude + ", " + this.props.screenProps.item.longitude + "", this);
        }
        this.props.screenProps.isSavePlace ? actions.loadData(this.configApi.apiGetItem + this.props.screenProps.item.resId, this) : actions.loadData(this.configApi.apiGetItem + this.props.screenProps.item.id, this);
        if (this.props.screenProps.isLogin) {
            let fbId = await AsyncStorage.getItem('fbId');
            actions.getCount(this.configApi.apiCheckRatting + fbId + "/" + this.id, this);
            actions.getUserRatting(this.configApi.apiGetUserRatting + fbId + "/" + this.id, this);
        }
        if (!this.state.star) {
            actions.getStar(this.configApi.apiGetRatting, this);
        }
    }

    async componentWillReceiveProps(nextProps){
        if(nextProps.screenProps.isLogin === true){
            let fbId = await AsyncStorage.getItem('fbId');
            actions.getUserRatting(this.configApi.apiGetUserRatting + fbId + "/" + this.id, this);
        }
    }

    _keyExtractor = (item, index) => index;

    _renderItem = ({ item }) => (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <ImageItem item={item} />
            <Text style={{ fontSize: 14, fontWeight: 'bold' }}>{item.name}</Text>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <StarRating
                    disabled={true}
                    starColor='yellow'
                    maxStars={5}
                    rating={this.state.star}
                />
            </View>
            <Touch activeOpacity={0.7} onPress={() => this.props.screenProps.navigate("DirectRestaurantScreen", { socket: this.props.screenProps.socket, item: item, currentPosition: this.props.screenProps.currentPosition })}>
                <View style={{ flex: 3, backgroundColor: '#dddddd' }}>
                    {
                        infoMap.map((info) => {
                            let text;
                            if (info.name === 'prices')
                                text = numeral(item.minPrices).format('0,0') + ' - ' + numeral(item.maxPrices).format('0,0');
                            else if (info.name === 'time')
                                text = item.open + ' - ' + item.close;
                            else if (info.name === 'distance')
                                text = this.props.screenProps.distance ? this.props.screenProps.distance + " ( Từ vị trí hiện tại )" : this.state.distance + " ( Từ vị trí hiện tại )";
                            else if (info.name === 'address')
                                text = item[info.name] + "( Đường " + item["street"] + ", Phường " + item["ward"] + ", Quận " + item["district"] + ", Tỉnh " + item["province"] + ")";
                            else if( info.name === 'ratting' )
                                text = this.state.itemRatting.star ? "Đánh giá của bạn " : "Bạn chưa đánh giá ";
                            else
                                text = item[info.name];
                            return (
                                <InfoItem isLogin={this.props.screenProps.isLogin} starSelected={this.starSelected.bind(this)} star={this.state.itemRatting.star} item={item} navigate={this.props.screenProps.navigate} name={info.icon} text={text} />
                            )
                        })
                    }
                </View>
            </Touch>
        </View>
    );

    async _onRefresh() {
        if (this.props.screenProps.currentPosition) {
            actions.getDirections("" + this.props.screenProps.currentPosition.latitude + ", " + this.props.screenProps.currentPosition.longitude + "", "" + this.props.screenProps.item.latitude + ", " + this.props.screenProps.item.longitude + "", this);
        }
        this.props.screenProps.isSavePlace ? actions.loadData(this.configApi.apiGetItem + this.props.screenProps.item.resId, this) : actions.loadData(this.configApi.apiGetItem + this.props.screenProps.item.id, this);
        if (this.props.screenProps.isLogin) {
            let fbId = await AsyncStorage.getItem('fbId');
            actions.getCount(this.configApi.apiCheckRatting + fbId + "/" + this.id, this);
            actions.getUserRatting(this.configApi.apiGetUserRatting + fbId + "/" + this.id, this);
        }
        if (!this.state.star) {
            actions.getStar(this.configApi.apiGetRatting, this);
        }
    }

    starSelected = async (star, type) => {
        let fbId = await AsyncStorage.getItem('fbId');
        let api = type == "new" ? this.configApi.apiPostRatting : this.configApi.apiUpdateRatting;
        let data = type == "new" 
        ? 
        {
            fbId: fbId,
            resId: this.id,
            star: star
        }
        :
        {
            id: this.state.itemRatting.id,
            star: star
        };
        await fetch(api, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        if (this.props.screenProps._handleRatting) {
            this.props.screenProps._handleRatting();
        }
        this.props.screenProps.socket.emit("post-ratting", this.id);
        this.setState({
            count: 1
        })
        actions.getStar(this.configApi.apiGetRatting, this);
        actions.getUserRatting(this.configApi.apiGetUserRatting + fbId + "/" + this.id, this);
    }

    render() {
        return (
            <FlatList
                data={_.uniq(this.state.dataList)}
                renderItem={this._renderItem}
                keyExtractor={this._keyExtractor}
                refreshing={this.state.isRefresh}
                onRefresh={this._onRefresh.bind(this)}
            />
        )
    }
}