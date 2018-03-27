import React, { Component } from 'react';
import { View, Text, Dimensions, FlatList, Image, TouchableOpacity, StyleSheet, Picker } from 'react-native';
import { Avatar, List, ListItem, SearchBar, Header, Icon, ButtonGroup } from 'react-native-elements';
import _ from 'lodash';
import moment from 'moment';
import MapView from 'react-native-maps';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';
import Modal from 'react-native-modal';
import Dropdown from 'react-native-modal-select-option';

import config from '../../../../config/config';
import actions from '../../../../app-actions/Actions.js';
import * as action from '../../../../app-actions/index';

import ItemRestaurant from '../../../cruid/component/ItemRestaurant';

var { width, height } = Dimensions.get("window");
const propsDropdown = {
    defaultValue: { value: 250, label: 'Bán kính 250 m' },
    options: [
        { value: 0.25, label: 'Bán kính 250 m' },
        { value: 0.5, label: 'Bán kính 500 m' },
        { value: 1, label: 'Bán kính 1 km' },
        { value: 2, label: 'Bán kính 2 km' },
        { value: 5, label: 'Bán kính 5 km' },
        { value: "hide", label: 'Hủy' },
    ],
    animationType: 'slide',
};

const styles = StyleSheet.create({
    container: {
        height: height,
        width: width,
        marginBottom: 5,
        justifyContent: 'flex-start'
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});

const triggerStyles = {
    triggerText: {
        color: 'orange',
        fontSize: 11
    }
}

const optionStyles = {
    optionWrapper: {
        backgroundColor: '#dddddd',
        margin: 5,
    },
    optionText: {
        color: 'orange',
    },
};

export default class ListNearMe extends Component {

    constructor(props) {
        super(props);
        listNear = this;
        this.state = {
            modalVisible: false,
            dataList: [],
            isRefresh: true,
            page: 1,
            count: 0,
            coords: {
                latitude: 20,
                longitude: 105
            },
            text: '',
            selectedIndex: 0,
            region: {
                latitude: this.props.screenProps.currentPosition.latitude,
                longitude: this.props.screenProps.currentPosition.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01
            },
            arrLocationsRestaurant: [],
            isHideMap: false,
            address: 'loading...',
            radius: 0.25,
            isHideList: false,
            selected: propsDropdown.defaultValue,
            margin: 1,
            selectedOption: propsDropdown.defaultValue || "abc"
        }
        this.props.screenProps.socket.on("change-position", function (data) {
            fetch("http://maps.googleapis.com/maps/api/geocode/json?latlng=" + data.latitude + "," + data.longitude + "&sensor=true")
                .then((response) => response.json())
                .then((responseJson) => {
                    listNear.setState({
                        address: responseJson.results[0].formatted_address,
                        region: {
                            latitude: data.latitude,
                            longitude: data.longitude,
                            latitudeDelta: 0.01,
                            longitudeDelta: 0.01
                        }
                    })
                })
            actions.loadData(listNear.configApi.apiList + "/nearByRadius/" + data.latitude + "/" + data.longitude + "/" + listNear.state.radius, listNear);
        })
    }

    configApi = {
        apiList: config.api_port ? config.api_url + ":" + config.api_port + config.apiGet + "restaurant" : config.api_url + config.apiGet + "restaurant",
        apiCount: config.api_port ? config.api_url + ":" + config.api_port + config.apiCount + "restaurant" : config.api_url + config.apiCount + "restaurant",        
    }

    async componentDidMount() {
        let { latitude, longitude } = this.props.screenProps.currentPosition;
        fetch("http://maps.googleapis.com/maps/api/geocode/json?latlng=" + latitude + "," + longitude + "&sensor=true")
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    address: responseJson.results[0].formatted_address
                })
            })
        this.props.screenProps.valueSearch != '' ? actions.loadData(this.configApi.apiList + "/nearByRadius/" + this.props.screenProps.valueSearch + "/" + latitude + "/" + longitude + "/" + this.state.radius * 1000 + "/0/" + config.limit, this) : actions.loadData(this.configApi.apiList + "/nearByRadius/" + latitude + "/" + longitude + "/" + this.state.radius * 1000, this);
        this.props.screenProps.valueSearch != '' ? actions.getCount(this.configApi.apiCount + "/nearByRadius/" + this.props.screenProps.valueSearch + "/" + latitude + "/" + longitude + "/" + this.state.radius * 1000 + "/0/" + config.limit, this) : actions.getCount(this.configApi.apiCount + "/nearByRadius/" + latitude + "/" + longitude + "/" + this.state.radius * 1000, this);
    }

    reloadMap() {
        this.setState({
            margin: 0
        })
    }

    _keyExtractor = (item, index) => item.id;

    _renderItem = ({ item }) => (
        <ItemRestaurant currentPosition={this.props.screenProps.currentPosition} socket={this.props.screenProps.socket} checkSave={this.props.screenProps.checkSave} statusSave={this.props.screenProps.statusSave} navigate={this.props.screenProps.navigate} isLogin={this.props.screenProps.isLogin} item={item} />
    );

    _onRefresh() {
        let { latitude, longitude } = this.props.screenProps.currentPosition;
        if (this.props.screenProps.valueSearch != '') {
            actions.loadData(this.configApi.apiList + "/nearByRadius/" + this.props.screenProps.valueSearch + "/" + latitude + "/" + longitude + "/" + this.state.radius*1000 + "/0/" + config.limit, this, 'refresh');
            actions.getCount(this.configApi.apiCount + "/nearByRadius/" + this.props.screenProps.valueSearch + "/" + latitude + "/" + longitude + "/" + this.state.radius*1000 + "/0/" + config.limit, this);
            
        }
        else {
            actions.loadData(this.configApi.apiList + "/nearByRadius/" + this.state.region.latitude + "/" + this.state.region.longitude + "/" + this.state.radius*1000, this, 'refresh');
            actions.getCount(this.configApi.apiCount + "/nearByRadius/" + this.state.region.latitude + "/" + this.state.region.longitude + "/" + this.state.radius*1000, this);
        }
    }
    _onEndReached() {
        if(this.state.page <= Math.ceil(this.state.count / config.limit)){
            if(this.props.screenProps.valueSearch != ''){
                actions.loadData(this.configApi.apiList + "/nearByRadius/" + this.props.screenProps.valueSearch + "/" + this.state.region.latitude + "/" + this.state.region.longitude + "/" + this.state.radius + "/" + (this.state.page-1)*config.limit + "/" + config.limit, this, 'loadMore');                
            }
            else{
                actions.loadData(this.configApi.apiList + "/nearByRadius/" + this.state.region.latitude + "/" + this.state.region.longitude + "/" + this.state.radius + "/" + (this.state.page-1)*config.limit + "/" + config.limit, this, 'loadMore'); 
            }
        }
    }

    _onSelectRestaurant(item) {
        this.props.screenProps.navigate("InfoTabs", { socket: this.props.screenProps.socket, checkSave: this.props.screenProps.checkSave, statusSave: this.props.screenProps.statusSave, item: item, currentPosition: this.state.region, isLogin: this.props.screenProps.isLogin })
    }

    checkScroll(e) {
        if (e.nativeEvent.contentOffset.y >= width) {
            this.setState({
                isHideMap: true
            })
        }
    }

    _hideList() {
        this.state.isHideList = !this.state.isHideList;
        this.setState(this.state);
    }

    selectRadius(radius) {
        if (radius !== this.state.radius) {
            let delta = 0.005;
            if (radius * 1000 === 500)
                delta = 0.01
            if (radius === 1)
                delta = 0.02
            if (radius === 2)
                delta = 0.04
            if (radius === 5)
                delta = 0.09
            let latitude = this.state.region.latitude;
            let longitude = this.state.region.longitude;
            let region = {
                latitude: latitude,
                longitude: longitude,
                latitudeDelta: !this.state.isHideList ? delta * 3 : delta * 3,
                longitudeDelta: !this.state.isHideList ? delta * 3 : delta * 3
            };
            this.setState({
                region: region,
                radius: radius * 1000
            });
            actions.loadData(this.configApi.apiList + "/nearByRadius/" + latitude + "/" + longitude + "/" + radius * 1000, this);
        }
    }
    _onSelect(item, isShow) {
        if (item.value !== this.state.radius && item.value !== 'hide') {
            let delta = 0.005;
            if (item.value * 1000 === 500)
                delta = 0.01
            if (item.value === 1)
                delta = 0.02
            if (item.value === 2)
                delta = 0.04
            if (item.value === 5)
                delta = 0.09
            let latitude = this.state.region.latitude;
            let longitude = this.state.region.longitude;
            let region = {
                latitude: latitude,
                longitude: longitude,
                latitudeDelta: !this.state.isHideList ? delta * 3 : delta * 3,
                longitudeDelta: !this.state.isHideList ? delta * 3 : delta * 3
            };
            this.setState({
                region: region,
                radius: item.value,
                selected: item,
                modalVisible: false
            });
            this.props.screenProps.valueSearch != '' ? actions.getCount(this.configApi.apiList + "/nearByRadius/" + this.props.screenProps.valueSearch + "/" + latitude + "/" + longitude + "/" + item.value * 1000 + "/0/" + config.limit, this) : actions.getCount(this.configApi.apiList + "/nearByRadius/" + latitude + "/" + longitude + "/" + item.value * 1000, this);            
            this.props.screenProps.valueSearch != '' ? actions.loadData(this.configApi.apiList + "/nearByRadius/" + this.props.screenProps.valueSearch + "/" + latitude + "/" + longitude + "/" + item.value * 1000 + "/0/" + config.limit, this, 'refresh') : actions.loadData(this.configApi.apiList + "/nearByRadius/" + latitude + "/" + longitude + "/" + item.value * 1000, this, 'refresh');
        }
        if (item.value === "hide") {
            this.setState({
                modalVisible: false
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log(this.configApi.apiList + "/nearByRadius/" + nextProps.screenProps.valueSearch + "/" + this.state.region.latitude + "/" + this.state.region.longitude + "/" + this.state.radius * 1000 + "/0/" + config.limit);
        nextProps.screenProps.valueSearch != '' ? actions.loadData(this.configApi.apiList + "/nearByRadius/" + nextProps.screenProps.valueSearch + "/" + this.state.region.latitude + "/" + this.state.region.longitude + "/" + this.state.radius * 1000 + "/0/" + config.limit, this) : actions.loadData(this.configApi.apiList + "/nearByRadius/" + this.state.region.latitude + "/" + this.state.region.longitude + "/" + this.state.radius * 1000 + "/0/" + config.limit, this);

    }



    render() {
        let dataMaker = [];
        this.state.dataList.map((data) => {
            let maker = {
                latitude: data.latitude,
                longitude: data.longitude
            }
            dataMaker.push(
                <MapView.Marker onCalloutPress={() => this._onSelectRestaurant(data)} onPress={e => console.log(e.nativeEvent)} title={data.name} description={data.address} coordinate={maker} />
            );
        })

        let flexMap = !this.state.isHideList ? 9 : 10;

        return (
            <View style={{ flex: 1 }}>
                <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 5 }}>
                    <Text numberOfLines={1} style={{ fontSize: 11 }}>{this.state.address}</Text>
                </View>
                <View style={{ height: 40, backgroundColor: '#99FFFF' }}>
                    <Dropdown {...propsDropdown}
                        onSelect={this._onSelect.bind(this)}
                        onShow={() => this.setState({ modalVisible: true })}
                        isShowingOptions={this.state.modalVisible}
                        selectedOption={this.state.selected}
                    />
                </View>
                {
                    this.state.isHideMap
                        ?
                        null
                        :
                        <View style={{
                            height: height,
                            width: width,
                            marginBottom: 5,
                            justifyContent: 'flex-start',
                            flex: 20,
                            backgroundColor: 'red'
                        }}>
                            <Icon
                                containerStyle={{ zIndex: 999999999999 }}
                                raised
                                size={15}
                                name='bars'
                                type='font-awesome'
                                onPress={this._hideList.bind(this)} />
                            <MapView
                                onMapReady={this.reloadMap.bind(this)}
                                showsMyLocationButton={true}
                                showsUserLocation={true}
                                style={{ ...StyleSheet.absoluteFillObject, margin: this.state.margin }}
                                region={this.state.region} >
                                {dataMaker}
                                <MapView.Circle
                                    center={this.state.region}
                                    radius={this.state.radius * 1000}
                                    fillColor="rgba(0,0,0,0.1)"
                                    strokeColor="rgba(0,0,0,0)"
                                    zIndex={2}
                                    strokeWidth={2}
                                />
                            </MapView>

                        </View>
                }
                {
                    !this.state.isHideList
                        ?
                        <View style={{ flex: 20 }}>
                            <FlatList
                                data={_.uniq(this.state.dataList)}
                                renderItem={this._renderItem}
                                keyExtractor={this._keyExtractor}
                                refreshing={this.state.isRefresh}
                                onRefresh={this._onRefresh.bind(this)}
                                onEndReached={this._onEndReached.bind(this)}
                                onEndReachedThreshold={0.7}
                                scrollToIndex={(e) => console.log(e)}
                                showsHorizontalScrollIndicator={false}
                            />
                        </View>
                        :
                        <View></View>
                }

            </View>
        )
    }
}

