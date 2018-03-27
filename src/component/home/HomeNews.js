import React, { Component } from 'react';
import { View, Text } from 'react-native';

import config from '../../config/config';

export default class HomeNews extends Component {

  configApi = {
    apiList: config.api_port ? config.api_url + ":" + config.api_port + config.apiGet + "restaurant" : config.api_url + config.apiGet + "restaurant",
  }

  async componentDidMount() {
    try {
      await fetch(this.configApi.apiList)
        .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson);
        })
    } catch(error) {
      console.log(error);
    }
  }

  render() {
    return (
      <View>
        <Text>This is HomeNew</Text>
      </View>
    )
  }
}