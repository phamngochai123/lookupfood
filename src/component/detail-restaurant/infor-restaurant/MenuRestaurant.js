import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList, ScrollView, RefreshControl } from 'react-native';
import { Icon } from 'react-native-elements';
import actions from '../../../app-actions/Actions';
import config from '../../../config/config';

import ItemMenuRestaurant from '../../cruid/component/ItemMenuRestaurant';

export default class MenuRestaurant extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataList: [],
            isRefresh: true,
        }
    }

    configApi = {
        apiList: config.api_port ? this.props.screenProps.isSavePlace ? config.api_url + ":" + config.api_port + config.apiGet + "category/" + this.props.screenProps.item.resId : config.api_url + ":" + config.api_port + config.apiGet + "category/" + this.props.screenProps.item.id : this.props.screenProps.isSavePlace ? config.api_url + config.apiGet + "category/" + this.props.screenProps.item.resId : config.api_url + config.apiGet + "category/" + this.props.screenProps.item.id
    }

    _onRefresh() {
        actions.loadData(this.configApi.apiList, this);
    }

    componentWillMount() {
        actions.loadData(this.configApi.apiList, this);
    }

    render() {
        let dataView = [];
        console.log(this.state.dataList);
        this.state.dataList.map((cate) => {
            dataView.push(
                <ItemMenuRestaurant resId={this.props.screenProps.isSavePlace ? this.props.screenProps.item.resId : this.props.screenProps.item.id} cateId={cate.id} cateName={cate.name} />
            )
        })
        return (
            <ScrollView style={{ flex: 1 }}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.isRefresh}
                        onRefresh={this._onRefresh.bind(this)}
                    />
                }
            >
                {dataView}
            </ScrollView>
        )
    }
}