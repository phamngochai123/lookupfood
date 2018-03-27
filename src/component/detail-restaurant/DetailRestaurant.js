import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import io from 'react-native-socket.io-client';

import config from '../../config/config';
import actions from '../../app-actions/Actions';

import { InfoTabs } from '../routers/Routers';
import HeaderItem from '../cruid/component/HeaderItem';
import Spinner from 'react-native-loading-spinner-overlay';
import { connect } from 'react-redux';

class DetailRestaurant extends Component {

    constructor(props) {
        super(props);
        detail = this;
        this.state = {
            distance: this.props.navigation.state.params.distance,
            isLogin: this.props.navigation.state.params.isLogin,
        }
        this.props.navigation.state.params.socket.on("change-position", function (data) {
            actions.getDirections(data.latitude + ", " + data.longitude, detail.props.navigation.state.params.item.latitude + ", " + detail.props.navigation.state.params.item.longitude, detail);
        })
    }

    static navigationOptions = ({ navigation }) => ({
        headerTitle: (<HeaderItem socket={navigation.state.params.socket} star={navigation.state.params.star} checkSave={navigation.state.params.checkSave} isSavePlace={navigation.state.params.isSavePlace} isHeader={true} item={navigation.state.params.item} distance={navigation.state.params.distance} isLogin={navigation.state.params.isLogin} />)
    });

    render() {
        let screenProps = {
            item: this.props.navigation.state.params.item,
            navigate: this.props.navigation.navigate,
            isLogin: this.props.isLogin,
            isSavePlace: this.props.navigation.state.params.isSavePlace,
            currentPosition: this.props.navigation.state.params.currentPosition,
            distance: this.state.distance,
            star: this.props.navigation.state.params.star,
            _handleRatting: this.props.navigation.state.params._handleRatting,
            navigation: this.props.navigation,
            socket: this.props.navigation.state.params.socket,
        }
        return (
            <InfoTabs screenProps={screenProps} />
        )
    }
}
module.exports = connect(function (state) {
    return { isLogin: state.IsLogin }
})(DetailRestaurant);