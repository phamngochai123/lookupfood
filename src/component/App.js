import React, { Component } from 'react';
import { View, Text, BackHandler, ToastAndroid } from 'react-native';
import { Avatar, List, ListItem, SearchBar, Header, Icon, SideMenu } from 'react-native-elements';
window.navigator.userAgent = 'react-native';
import RNExitApp from 'react-native-exit-app';
import SplashScreen from 'react-native-splash-screen';
import { connect } from 'react-redux';
import config from '../config/config';
import * as actions from '../actions/index';
import actionsApi from '../app-actions/Actions'

import { Root } from './routers/Routers';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      backPress: false,
    }
  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', function () {
      BackHandler.removeEventListener('BackPress', function () { });
      if (this.props.navigation && this.props.navigation.nav.routes[2].routeName === 'ImageSwiperScreen') {
        this.props.navigation.dispatch({ type: 'Navigation/BACK' });
        return;
      }
      else {
        var _this = this;
        if (!this.state.backPress) {
          ToastAndroid.show('Bấm lần nữa để thoát!', ToastAndroid.SHORT);
          this.setState({ backPress: true });
          setTimeout(function () {
            _this.setState({ backPress: false });
          }, 2500);
        } else {
          RNExitApp.exitApp();
        }
        return true;

      }
    }.bind(this));
  }

  componentDidMount() {
    if (this.props.isLogin) {
      this.props.dispatch(actions.logIn());
    }
    setTimeout(() => {
      SplashScreen.hide();
    }, 500)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isLogin) {
      this.props.dispatch(actions.logIn());
    }
    else {
      this.props.dispatch(actions.logOut());
    }
  }

  render() {
    let myProps = {
      checkSave: this.props.checkSave,
      statusSave: this.props.statusSave,
      isLogin: this.props.isLogin,
      test: this.props.test,
      logIn: this.props.logIn,
      logOut: this.props.logOut,
      currentPosition: this.props.currentPosition,
      socket: this.props.socket,
    }
    return (
        <Root screenProps={myProps} />
    )
  }
}
module.exports = connect(function (state) {
  return {}
})(App);