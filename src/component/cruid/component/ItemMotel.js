import React, { Component } from 'react';
import { View, Text, Dimensions, FlatList, Image, TextInput, AsyncStorage, Alert, Button, TouchableOpacity } from 'react-native';
import { Avatar, List, ListItem, Icon, Rating } from 'react-native-elements';
import StarRating from 'react-native-star-rating';
import moment from 'moment';
import Touch from 'react-native-touch';

import config from '../../../config/config';
import actions from '../../../app-actions/Actions.js';

import Comment from './Comment';
import BottomItem from './BottomItem';
import ImageItem from './ImageItem';
import HeaderItem from './HeaderItem';

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

export default class ItemMotel extends Component {

    constructor(props) {
        super(props);
        this.state = {
            item: {},
            region: {
                latitude: 0,
                longitude: 0,
            },
            distance: "loading...",
            isComment: false,
            detailComment: '',
            height: 40,
            isNullComment: true,
            isLogin: false,
            star: 0,
        }
    }

    componentDidMount() {
        let { item } = this.props;
        this.state.item = item;
    }

    render() {
        return (
            <Touch onPress={() => {this.props.navigations.navigate("DetailMotel", {item: this.props.item})}}>
                <View style={{ backgroundColor: '#fff', paddingBottom: 5, marginTop: 5, flex: 1, flexDirection: 'row' }}>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Avatar
                            medium
                            source={{ uri: this.props.item ? this.props.item.image : "https://s3.amazonaws.com/uifaces/faces/twitter/kfriedson/128.jpg" }}
                            onPress={() => console.log("Works!")}
                            activeOpacity={0.7}
                        />
                    </View>
                    <View style={{ flex: 2 }}>
                        <Text numberOfLines={1} style={{ fontSize: 13, fontWeight: 'bold' }}>{this.props.item ? this.props.item.subject : "loading..."}</Text>
                        <Text numberOfLines={1} style={{ fontSize: 11, color: '#696969' }}>{this.props.item ? this.props.item.price_string : "loading..."}</Text>
                    </View>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <Text numberOfLines={1} style={{ fontSize: 10, fontWeight: 'bold', color: 'blue' }}>{this.props.item ? this.props.item.date : 'loading'}</Text>
                        <Text numberOfLines={1} style={{ fontSize: 10, fontWeight: 'bold' }}>{this.props.item ? this.props.item.area_name : 'loading'}</Text>
                        {/* <Rating
                            imageSize={10}
                            readonly
                            startingValue={parseFloat(star.toFixed(1))}
                        /> */}
                        
                    </View>
                </View>
            </Touch>
        )
    }
}

