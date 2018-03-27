/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
console.disableYellowBox = true;
console.ignoredYellowBox = ['Remote debugger'];
import React, { Component } from 'react';

import { MenuContext } from 'react-native-popup-menu';

import App from './src/component/App';
import { AppRegistry, AsyncStorage, NetInfo, View } from 'react-native';
import { Provider } from 'react-redux';
import store from './src/reducer/reducer';
import config from './src/config/config';
import actions from './src/app-actions/Actions';
import io from 'react-native-socket.io-client';
import LocationServicesDialogBox from "react-native-android-location-services-dialog-box";


export default class LookupFood extends Component {

  constructor(props) {

    super(props);
    app = this;
    this.socket = config.api_port ? io(config.api_url + ":" + config.api_port, { jsonp: false }) : io(config.api_url + "/", { jsonp: false });
    this.state = {
      isLogin: false,
      checkSave: true,
      coords: {
        latitude: 21,
        longitude: 105
      }
    }
  }

  async componentDidMount() {
    await navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);
      let { latitude, longitude } = position.coords;
      this.setState({
        coords: {
          latitude: latitude,
          longitude: longitude
        }
      })
    }, (error) => console.log(error), { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 })

    await navigator.geolocation.watchPosition((position) => {
      let { latitude, longitude } = position.coords;
      this.socket.emit("change-position", { latitude: latitude, longitude: longitude });
      this.setState({
        coords: {
          latitude: latitude,
          longitude: longitude
        }
      })
    }, (error) => console.log(error), { enableHighAccuracy: false, timeout: 20000, maximumAge: 10000 })
    LocationServicesDialogBox.checkLocationServicesIsEnabled({
      message: "<h2>Truy cập vị trí ?</h2>Ứng dụng này muốn thay đổi cài đặt thiết bị của bạn:<br/><br/>Sử dụng GPS, Wi-Fi, và mạng di động cho vị trí<br/><br/>",
      ok: "YES",
      cancel: "NO",
      enableHighAccuracy: true, // true => GPS AND NETWORK PROVIDER, false => ONLY GPS PROVIDER 
      showDialog: true // false => Opens the Location access page directly 
    }).then(function (success) {
      // success => {alreadyEnabled: true, enabled: true, status: "enabled"}  
      navigator.geolocation.getCurrentPosition((position) => {
        let { latitude, longitude } = position.coords;

        this.setState({
          coords: {
            latitude: latitude,
            longitude: longitude
          }
        })
      }, error => console.log(error), { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 });
    }.bind(this)
      ).catch((error) => {
        console.log(error.message);
      });

    BackHandler.addEventListener('hardwareBackPress', () => {
      LocationServicesDialogBox.forceCloseDialog();
    });
  }

  async componentWillMount() {
    NetInfo.isConnected.fetch().then(isConnected => {
      if (!isConnected) {
        alert("Kết nối bị lỗi. Vui lòng kiểm tra lại kết nối internet");
      }
    });
    let act = await AsyncStorage.getItem('accessToken');
    if (act !== null) {
      this.setState({
        isLogin: true
      })
    }
  }

  logOut() {
    this.setState({
      isLogin: false
    })
  }

  logIn() {
    this.setState({
      isLogin: true
    })
  }

  changeStatusSave() {
    this.setState({
      checkSave: !this.state.checkSave,
    })
  }

  render() {
    return (
      <Provider store={store}>
        <App socket={this.socket} currentPosition={this.state.coords} isLogin={this.state.isLogin} statusSave={this.state.checkSave} checkSave={this.changeStatusSave.bind(this)} logOut={this.logOut.bind(this)} logIn={this.logIn.bind(this)} />
      </Provider>
    );
  }
}
AppRegistry.registerComponent('LookupFood', () => LookupFood);
