import React, { Component } from 'react';
import { View, Text, Alert, AsyncStorage } from 'react-native';
import { Avatar, Icon } from 'react-native-elements';
import _ from 'lodash';
import { connect } from 'react-redux';

import config from '../../../config/config';
import actions from '../../../app-actions/Actions.js';

export default class HeaderItem extends Component {

    constructor(props) {
        super(props);
        HeaderItems = this;
        this.state = {
            dataList: [],
            isRefresh: false,
            star: this.props.star
        }
        this.props.socket.on("have-new-ratting", function (data) {
            HeaderItems.setState({
                star: data
            })
        })
    }

    configApi = {
        apiList: config.api_port ? config.api_url + ":" + config.api_port + config.apiGet + "restaurants/save/" : config.api_url + config.apiGet + "restaurants/save/",
        apiPostSavePlace: config.api_port ? config.api_url + ":" + config.api_port + config.apiPost + "savePlace" : config.api_url + config.apiPost + "savePlace",
        apiPostRemovePlace: config.api_port ? config.api_url + ":" + config.api_port + config.apiPost + "removePlace" : config.api_url + config.apiPost + "removePlace",
        apiGetRatting: config.api_port ? this.props.isSavePlace ? config.api_url + ":" + config.api_port + config.apiGet + "rattingTotal/" + this.props.item.resId : config.api_url + ":" + config.api_port + config.apiGet + "rattingTotal/" + this.props.item.id : this.props.isSavePlace ? config.api_url + config.apiGet + "rattingTotal/" + this.props.item.resId : config.api_url + config.apiGet + "rattingTotal/" + this.props.item.id,
    }

    async componentWillMount() {
        if (this.props.isLogin) {
            let fbId = await AsyncStorage.getItem('fbId');
            actions.loadData(this.configApi.apiList + fbId, this);
        }
        if(!this.state.star){
            actions.getStar(this.configApi.apiGetRatting, this);
        }
    }

    async componentWillReceiveProps(nextProps) {
        if (nextProps.isLogin || nextProps.isLoginReducer) {
            let fbId = await AsyncStorage.getItem('fbId');
            if (fbId) {
                actions.loadData(this.configApi.apiList + fbId, this);
            }
        }
        else {
            this.setState({
                dataList: []
            })
        }
        actions.getStar(this.configApi.apiGetRatting, this);
    }

    render() {

        let idItem = this.props.isSavePlace ? this.props.item.resId : this.props.item.id;
        let dataMap = [];
        this.state.dataList.map((data) => {
            dataMap.push(data.resId);
        })

        return (
            <View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: this.props.marginTop }}>
                    <Avatar
                        width={30}
                        height={30}
                        small
                        rounded
                        title={this.state.star ? this.state.star.toFixed(1) : this.props.star ? this.props.star.toFixed(1) : '0.0'}
                        overlayContainerStyle={{ backgroundColor: '#00CC00' }}
                        activeOpacity={0.7}
                    />
                </View>
                <View style={{ flex: 5, justifyContent: 'center' }}>
                    <Text style={{ fontWeight: 'bold' }}>{this.props.item.name ? this.props.item.name : ''}</Text>
                    <Text numberOfLines={1} style={{ color: '#696969', fontSize: 10 }}>{this.props.item.address ? this.props.item.address : ''}</Text>
                </View>
                <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                    <Text style={{ color: '#696969', fontSize: 10 }}>{this.props.item.address && !this.props.isHeader ? this.props.distance : ''}</Text>
                </View>
                {
                    this.props.isLogin || this.props.isLoginReducer
                        ?
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <Icon
                                name='save'
                                type='font-awesome'
                                color={dataMap.indexOf(idItem) > -1 ? 'blue' : '#696969'}
                                onPress={dataMap.indexOf(idItem) > -1 ? () => actions.removeSavedRestaurant(idItem, this) : () => actions.saveRestaurant(idItem, this)}
                            />
                        </View>
                        :
                        <View></View>
                }
            </View>
        )
    }
}

module.exports = connect(function (state) {
    return { isLoginReducer: state.IsLogin }
})(HeaderItem);