import React, { Component } from 'react';
import { View, Text, Dimensions, FlatList, Image } from 'react-native';
import { Avatar, List, ListItem, Icon,  } from 'react-native-elements';

import config from '../../../config/config';
import actions from '../../../app-actions/Actions.js';

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

export default class BottomItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            count: 0,
            isComment: false,
        }
    }

    configApi = {
        apiCount: config.api_port ? config.api_url + ":" + config.api_port + config.apiCount + "comment/" + this.props.idRes : config.api_url + config.apiCount + "comment/" + this.props.idRes,
    }

    componentWillMount() {
        actions.getCount(this.configApi.apiCount, this);
    }

    componentWillReceiveProps() {
        actions.getCount(this.configApi.apiCount, this);
    }

    render() {
        return (
            <View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Icon
                            name='comment-o'
                            type='font-awesome'
                            color='#000'
                            size={15}
                            iconStyle={{ marginLeft: width/5 }}
                            onPress={this.props.setComment} />
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <Text onPress={this.props.setComment} style={{ fontSize: 10, color: '#000', marginLeft: 5 }}>{this.state.count}</Text>
                    </View>
                </View>
                <View style={{ flex: 1 , alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 10, color: '#000' }}>
                        {this.props.checkOpen ? "Đang mở cửa" : "Chưa mở cửa"}
                    </Text>
                </View>
            </View>
        )
    }
}

