import React, { Component } from 'react';
import { View, Text, Dimensions, FlatList, Image, TouchableOpacity, AsyncStorage, ToastAndroid } from 'react-native';
import { Avatar, List, ListItem, SearchBar, Header, Icon, ButtonGroup } from 'react-native-elements';
import Toaster, { ToastStyles } from 'react-native-toaster';
import _ from 'lodash';
import moment from 'moment';
import { connect } from 'react-redux';

import config from '../../config/config';
import actions from '../../app-actions/Actions.js';

import ItemMotel from '../cruid/component/ItemMotel';

export default class ListMotel extends Component {

  constructor(props) {
    super(props);
    PlaceSave = this;
    this.state = {
      dataList: [],
      page: 1,
      total: 0,
      coords: {
        latitude: 0,
        longitude: 0
      },
      text: '',
      selectedIndex: 0,
      isRefresh: false,
    }
  }

  configApi = {
    apiList: 'https://gateway.chotot.com/v1/public/ad-listing?region=12&cg=1050&w=1&page=',
    param0: '&limit=20&o=',
    param1: '&st=u,h',
  }
  componentDidMount() {
    actions.loadData(this.configApi.apiList + this.state.page + this.configApi.param0 + (this.state.page * 20) + this.configApi.param1, this, 'refresh');
  }
  that = this;
  _keyExtractor = (item, index) => item.id;

  _renderItem = ({ item }) => (
    <ItemMotel navigations={this.props.navigation} item={item} />
  );

  _onRefresh() {
    actions.loadData(this.configApi.apiList + this.state.page + this.configApi.param0 + (this.state.page * 20) + this.configApi.param1, this, 'refresh');
  }

  _onEndReached() {
    if (this.state.page <= Math.ceil(this.state.total / 20)) {
      actions.loadData(this.configApi.apiList + this.state.page + this.configApi.param0 + (this.state.page * 20) + this.configApi.param1, this, 'loadMore');
    }
  }

  render() {
    console.log(this.state.dataList);
    return (
      <FlatList
        data={_.uniq(this.state.dataList)}
        renderItem={this._renderItem}
        keyExtractor={this._keyExtractor}
        refreshing={this.state.isRefresh}
        onRefresh={this._onRefresh.bind(this)}
        onEndReached={this._onEndReached.bind(this)}
        onEndReachedThreshold={0.5}
      />
    )
  }
}
