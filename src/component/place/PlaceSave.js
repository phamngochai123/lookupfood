import React, { Component } from 'react';
import { View, Text, Dimensions, FlatList, Image, TouchableOpacity, AsyncStorage, ToastAndroid } from 'react-native';
import { Avatar, List, ListItem, SearchBar, Header, Icon, ButtonGroup } from 'react-native-elements';
import Toaster, { ToastStyles } from 'react-native-toaster';
import _ from 'lodash';
import moment from 'moment';
import { connect } from 'react-redux';

import config from '../../config/config';
import actions from '../../app-actions/Actions.js';

import ItemRestaurant from '../cruid/component/ItemRestaurant';

export default class PlaceSave extends Component {

  constructor(props) {
    super(props);
    PlaceSave = this;
    this.state = {
      dataList: [],
      page: 1,
      coords: {
        latitude: 0,
        longitude: 0
      },
      text: '',
      selectedIndex: 0,
    }
    this.props.screenProps.socket.on("have-new-ratting", async function (data) {
      if (PlaceSave.props.screenProps.isLogin) {
        let fbId = await AsyncStorage.getItem('fbId');
        actions.loadData(PlaceSave.configApi.apiList + fbId, PlaceSave);
      }
  })
  }

  configApi = {
    apiList: config.api_port ? config.api_url + ":" + config.api_port + config.apiGet + "restaurants/save/" : config.api_url + config.apiGet + "restaurants/save/",
    apiPostRemovePlace: config.api_port ? config.api_url + ":" + config.api_port + config.apiPost + "removePlace" : config.api_url + config.apiPost + "removePlace",
  }
  async componentDidMount() {
    if (this.props.screenProps.isLogin) {
      let fbId = await AsyncStorage.getItem('fbId');
      actions.loadData(this.configApi.apiList + fbId, this);
    }
  }
  that = this;
  _keyExtractor = (item, index) => item.id;

  _renderItem = ({ item }) => (
    <ItemRestaurant currentPosition={this.props.screenProps.currentPosition} socket={ this.props.screenProps.socket } isSavePlace={true} isLogin={this.props.screenProps.isLogin} navigate={this.props.navigation.navigate} deleteItem={this.delete.bind(this)} isTabSave={true} item={item} />
  );

  async _onRefresh() {
    if (this.props.screenProps.isLogin) {
      let fbId = await AsyncStorage.getItem('fbId');
      actions.loadData(this.configApi.apiList + fbId, this);
    }
  }
  async componentWillReceiveProps(nextProps) {
    if (nextProps.screenProps.isLogin) {
      let fbId = await AsyncStorage.getItem('fbId');
      if (fbId) {
        actions.loadData(this.configApi.apiList + fbId, this);
      }
    }
  }

  delete = (item) => {
    actions.removeSavedRestaurant(item.resId, this, item.name);
  }

  render() {
    return (
      <View>
        {
          this.props.screenProps.isLogin
            ?
            this.state.dataList.length > 0
              ?
              <FlatList
                data={_.uniq(this.state.dataList)}
                renderItem={this._renderItem}
                keyExtractor={this._keyExtractor}
                refreshing={this.state.isRefresh}
                onRefresh={this._onRefresh.bind(this)}
              />
              :
              <Text>Bạn chưa lưu địa điểm nào</Text>
            :
            <Text>Bạn cần đăng nhập để lưu địa điểm</Text>
        }
      </View>
    )
  }
}
