import React, { Component } from 'react';
import { View, Text, Image, Dimensions } from 'react-native';

import ImageItem from './ImageItem'

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

export default class ItemNear extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: this.props.item ? this.props.item : {}
        }
    }
    render() {
        return (
            <View style={{ flex: 1, paddingLeft: 10, paddingTop: 10 }}>
                <View style={{flex: 3}}>
                    <ImageItem boderradius={5} width={width * 0.4} height={height * 0.17} item={this.state.item} />
                </View>
                <View style={{flex: 1, width: width * 0.4}}>
                    <Text numberOfLines={1} style={{ fontSize: 10, fontWeight: 'bold' }}>{this.props.item.name}</Text>
                    <Text numberOfLines={1} style={{ fontSize: 10 }}>{this.props.item.address}</Text>
                </View>
            </View>
        )
    }
}