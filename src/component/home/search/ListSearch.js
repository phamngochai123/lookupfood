import React, { Component } from 'react';
import { View, Text, Dimensions, FlatList, Image, TouchableOpacity } from 'react-native';
import { Avatar, List, ListItem, SearchBar, Header, Icon, ButtonGroup } from 'react-native-elements';
import _ from 'lodash';
import moment from 'moment';

import config from '../../../config/config';
import actions from '../../../app-actions/Actions.js';
import * as action from '../../../app-actions/index';

import { connect } from 'react-redux';

import ItemRestaurant from '../../cruid/component/ItemRestaurant';
import { SearchTabs } from '../../routers/Routers';
import SearchBars from './SearchBars';

class ListSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ''
        }
    }
    
    static navigationOptions = {
        headerTitle: (<SearchBars />),
    }

    navigate = this.props.navigation.navigate;

    render() {
        let screenProps = {
            valueSearch: this.props.valueSearch,
            navigate: this.navigate,
            isLogin: this.props.navigation.state.params.isLogin,
            checkSave: this.props.navigation.state.params.checkSave,
            statusSave: this.props.navigation.state.params.statusSave,
            navigation: this.props.navigation,
            socket: this.props.navigation.state.params.socket,
            currentPosition: this.props.navigation.state.params.currentPosition,
        }
        return (
            <SearchTabs screenProps={screenProps} />
        )
    }
}
module.exports = connect(function(state) {
    return { valueSearch: state.ValueSearch }
})(ListSearch);

