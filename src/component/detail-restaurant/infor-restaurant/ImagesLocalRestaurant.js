import React, { Component } from 'react';
import { View, Text, Image, FlatList, Dimensions, ListView, RefreshControl, TouchableOpacity } from 'react-native';
import { Grid, Col, Row } from 'react-native-elements';

import ImageItem from '../../cruid/component/ImageItem';
import config from '../../../config/config';
import actions from '../../../app-actions/Actions';

var { width, height } = Dimensions.get('window');

export default class ImagesLocal extends Component {
    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            dataList: [],
            isRefresh: true,
            page: 1,
            count: true,
        }
    }

    configApi = {
        apiList: config.api_port ? this.props.screenProps.item.resId ? config.api_url + ':' + config.api_port + config.apiGet + 'images/restaurant/' + this.props.screenProps.item.resId : config.api_url + ':' + config.api_port + config.apiGet + 'images/restaurant/' + this.props.screenProps.item.id : this.props.screenProps.item.resId ? config.api_url + config.apiGet + 'images/restaurant/' + this.props.screenProps.item.resId : config.api_url + config.apiGet + 'images/restaurant/' + this.props.screenProps.item.id,
        apiCount: config.api_port ? this.props.screenProps.item.resId ? config.api_url + ':' + config.api_port + config.apiCount + 'images/restaurant/' + this.props.screenProps.item.resId : config.api_url + ':' + config.api_port + config.apiCount + 'images/restaurant/' + this.props.screenProps.item.id : this.props.screenProps.item.resId ? config.api_url + config.apiCount + 'images/restaurant/' + this.props.screenProps.item.resId : config.api_url + config.apiCount + 'images/restaurant/' + this.props.screenProps.item.id,
        
    }

    // componentWilMount() {
    //     BackHandler.addEventListener('hardwareBackPress', function () {
    //         const { dispatch } = this.props.screenProps.navigation;
    //         this.props.screenProps.navigation.goBack();
    //         // if (nav.routes[0].routeName === 'SearchNearMeScreen') {
    //         //     this.props.navigation.goBack();
    //         //     return;
    //         // }
    //         // if (shouldCloseApp(nav)) return false
    //         //dispatch({ type: 'Navigation/BACK', key: null });
    //         return true;
    //     }.bind(this));
    // }

    componentDidMount() {
        actions.loadData(this.configApi.apiList + "/0/12", this, 'refresh');
        actions.getCount(this.configApi.apiCount, this);
    }

    _onRefresh = () => {
        actions.loadData(this.configApi.apiList + "/0/12", this, 'refresh')
    }

    _onEndReached = () => {
        if(this.state.page < Math.ceil(this.state.count/12))
            actions.loadData(this.configApi.apiList + "/" + (this.state.page) * 12 + "/12", this, 'loadMore')
    }

    render() {
        let index = 0;
        let id = this.props.screenProps.item.resId ? this.props.screenProps.item.resId : this.props.screenProps.item.id;
        return (
            <ListView
                onEndReached={this._onEndReached.bind(this)}
                onEndReachedThreshold={0.5}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.isRefresh}
                        onRefresh={this._onRefresh.bind(this)}
                    />
                }
                contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap', backgroundColor: 'white' }}
                dataSource={this.ds.cloneWithRows(this.state.dataList)}
                renderRow={(rowData, sectionID, rowID) =>
                    <TouchableOpacity style={{ margin: 2 }} onPress={() => this.props.screenProps.navigation.navigate("ImageSwiperScreen", {count: this.state.count, dataList: this.state.dataList, index: rowID, id: id })}>
                        <Image resizeMethod='resize' resizeMode='cover' style={{ width: width / 3 - 6, height: height / 4 }} source={{ uri: rowData.link }} />
                    </TouchableOpacity>}
            />
        )
    }
}