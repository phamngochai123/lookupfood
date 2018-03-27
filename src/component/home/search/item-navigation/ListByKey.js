import React, { Component } from 'react';
import { View, Text, Dimensions, FlatList, Image, TouchableOpacity } from 'react-native';
import { Avatar, List, ListItem, SearchBar, Header, Icon, ButtonGroup } from 'react-native-elements';
import _ from 'lodash';
import moment from 'moment';
import { connect } from 'react-redux';

import config from '../../../../config/config';
import actions from '../../../../app-actions/Actions.js';
import * as action from '../../../../app-actions/index';

import ItemRestaurant from '../../../cruid/component/ItemRestaurant';

export default class ListByKey extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataList: [],
            isRefresh: true,
            page: 1,
            coords: {
                latitude: 0,
                longitude: 0
            },
            text: '',
            selectedIndex: 0,
            count: 1,
        }
    }

    configApi = {
        apiList: config.api_port ? config.api_url + ":" + config.api_port + config.apiGet + "restaurant" : config.api_url + config.apiGet + "restaurant",
        apiCount: config.api_port ? config.api_url + ":" + config.api_port + config.apiCount + "restaurant" : config.api_url + config.apiCount + "restaurant",
    }
    componentDidMount() {
        actions.loadData(this.configApi.apiList + "/0/" + config.limit, this);
        actions.getCount(this.configApi.apiCount, this);
    }

    _keyExtractor = (item, index) => item.id;

    _renderItem = ({ item }) => (
        <ItemRestaurant currentPosition={this.props.screenProps.currentPosition} socket={this.props.screenProps.socket} navigate={this.props.screenProps.navigate} isLogin={this.props.screenProps.isLogin} item={item} />
    );

    _onRefresh() {
        console.log(this.props.screenProps.valueSearch);
        if (this.props.screenProps.valueSearch != '' && this.props.screenProps.valueSearch != null)
            actions.loadData(this.configApi.apiList + "/" + this.props.screenProps.valueSearch + "/0/" + config.limit, this, 'refresh');
        else
            actions.loadData(this.configApi.apiList + "/0/" + config.limit, this, 'refresh');
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.screenProps.valueSearch !== '' && (nextProps.screenProps.valueSearch.length > 0)) {
            actions.loadData(this.configApi.apiList + "/" + nextProps.screenProps.valueSearch + "/0/" + config.limit, this);
        }
        else
            actions.loadData(this.configApi.apiList + "/0/" + config.limit, this);
    }

    _onEndReached() {
        if (this.props.screenProps.valueSearch !== '' && this.props.screenProps.valueSearch.length > 0 && this.state.page - 1 <= Math.ceil(this.state.count / config.limit)) {
            actions.loadData(this.configApi.apiList + "/" + this.props.screenProps.valueSearch + "/" + config.limit * this.state.page + "/" + config.limit, this, 'loadMore');
        }

        else if (this.state.page - 1 <= Math.ceil(this.state.count / config.limit))
            actions.loadData(this.configApi.apiList + "/" + config.limit * (this.state.page) + "/" + config.limit, this, 'loadMore');
    }

    render() {
        return (
            <FlatList
                showsHorizontalScrollIndicator={false}
                data={_.uniq(this.state.dataList)}
                renderItem={this._renderItem}
                keyExtractor={this._keyExtractor}
                refreshing={this.state.isRefresh}
                onRefresh={this._onRefresh.bind(this)}
                scrollToIndex={(index) => console.log(index)}
                onEndReached={this._onEndReached.bind(this)}
                onEndReachedThreshold={0.5}
            />
        )
    }
}
