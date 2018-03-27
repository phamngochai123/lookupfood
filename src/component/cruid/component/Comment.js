import React, { Component } from 'react';
import { View, Text, Dimensions, FlatList, Image, Alert } from 'react-native';
import { Avatar, List, ListItem } from 'react-native-elements';

import DetailComment from './DetailComment';
import config from '../../../config/config';
import actions from '../../../app-actions/Actions.js';
check = true;
export default class Comment extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataList: [],
        }
    }

    configApi = {
        apiList: config.api_port ? this.props.api ? this.props.api : config.api_url + ":" + config.api_port + config.apiGet + "comment/" + this.props.idRes : this.props.api ? this.props.api : config.api_url + config.apiGet + "comment/" + this.props.idRes,
        apiGetCommentNew: config.api_port ? config.api_url + ":" + config.api_port + config.apiGet + "comments/" : config.api_url + config.apiGet + "comments/",
    }

    componentWillMount() {
        actions.loadData(this.configApi.apiList, this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isListAll) {
            actions.loadData(nextProps.api, this, 'commentLocal');
        }
        else {
            //if (this.props.idRes === parseInt(nextProps.currentItem)) {
            actions.loadData(this.configApi.apiList, this);
            //}
        }

    }

    _keyExtractor = (item, index) => item.id;

    _renderItem = ({ item }) => (
        <View style={{ flex: 1, flexDirection: 'row', marginBottom: 7 }}>
            <View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Avatar
                        small
                        rounded
                        source={{ uri: item.picture }}
                        onPress={() => console.log("Works!")}
                        activeOpacity={0.7}
                    />
                </View>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <Text numberOfLines={1} style={{ fontWeight: 'bold', fontSize: 10 }}>{item.fbName}</Text>
                </View>
            </View>
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <DetailComment numLine={this.props.numLine} commentDetail={item.commentDescription} />
            </View>
        </View>
    );

    render() {
        return (
            <FlatList
                data={this.state.dataList}
                renderItem={this._renderItem}
                keyExtractor={this._keyExtractor}
                onEndReached={this.props.isListAll ? () => this.props._onEndReached() : () => { }}
                onEndReachedThreshold={0.5}
            />
        )
    }
}

