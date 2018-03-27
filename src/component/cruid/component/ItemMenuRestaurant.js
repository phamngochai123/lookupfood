import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import { Icon } from 'react-native-elements';

import config from '../../../config/config';
import actions from '../../../app-actions/Actions.js';

import Collapsible from 'react-native-collapsible';
import numeral from 'numeral';

export default class MenuRestaurant extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataList: [],
            collapsed: false
        }
    }

    configApi = {
        apiList: config.api_port ? config.api_url + ":" + config.api_port + config.apiGet + "food/" + this.props.resId + "/" + this.props.cateId : config.api_url + config.apiGet + "food/" + this.props.resId + "/" + this.props.cateId
    }

    componentWillMount() {
        actions.loadData(this.configApi.apiList, this);
    }

    _handleCollapsed() {
        this.setState({
            collapsed: !this.state.collapsed
        })
    }

    componentWillReceiveProps(nextProps){
        let api = config.api_port ? config.api_url + ":" + config.api_port + config.apiGet + "food/" + nextProps.resId + "/" + nextProps.cateId : config.api_url + config.apiGet + "food/" + nextProps.resId + "/" + nextProps.cateId;
        //console.log(api);
        actions.loadData(api, this);
    }

    render() {
        //console.log(this.state.dataList);
        return (
            <View>
                <TouchableOpacity style={{ flexDirection: 'row', height: 40, backgroundColor: '#00BFFF', marginBottom: 2 }} onPress={() => this._handleCollapsed()}>
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <Text style={{ color: 'white', fontSize: 15, marginLeft: 10 }}>{this.props.cateName}</Text>
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
                        <Icon
                            name={!this.state.collapsed ? 'angle-right' : 'angle-down'}
                            type='font-awesome' />
                    </View>
                </TouchableOpacity>
                {
                    this.state.collapsed
                        ?
                        <View>
                            <FlatList
                                scrollEnabled={false}
                                data={this.state.dataList}
                                renderItem={({ item, index }) =>
                                    <View style={{ flex: 1, flexDirection: 'row', marginBottom: 5, height: 36, backgroundColor: index%2==0 ? '#fff' : '#dddddd' }}>
                                        <View style={{ flex: 1, justifyContent: 'center' }}>
                                            <Text style={{ marginLeft: 20 }}>{item.name}</Text>
                                        </View>
                                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end', marginRight: 10 }}>
                                            <Text>{numeral(item.price).format(0,0)}</Text>
                                        </View>
                                    </View>
                                }
                                keyExtractor={item => item.id}
                                removeClippedSubviews={false}
                            />
                        </View>
                        :
                        <View></View>
                }
                {/* <View style={{ flex: 1 }}> */}
                    {/* <Collapsible collapsed={false} > */}
                        {/* <View style={{ flex: 4 }}>
                            <FlatList
                                scrollEnabled={false}
                                data={this.state.dataList}
                                renderItem={({ item, index }) =>
                                    <View style={{ flex: 1, flexDirection: 'row' }}>
                                        <View style={{ flex: 1, width: 500, height: 50, justifyContent: 'flex-start' }}>
                                            <Text>{item.name}</Text>
                                            <Image style={{ width: 100, height: 100 }} source={{ uri: "https://i.pinimg.com/736x/be/0a/b7/be0ab7e1a7f2f5a319e190ec0bad1e31--cute-girls-vietnam.jpg" }} />
                                        </View>
                                        <View style={{ flex: 1 }}>
                                            <Text>{item.price}</Text>
                                        </View>
                                    </View>
                                }
                                keyExtractor={item => item.name}
                                removeClippedSubviews={false}
                            />
                        </View> */}
                    {/* </Collapsible> */}
                {/* </View> */}


            </View>
        )
    }
}