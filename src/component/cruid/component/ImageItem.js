import React, { Component } from 'react';
import { View, Text, Dimensions, FlatList, Image } from 'react-native';
import { Avatar, List, ListItem, Icon } from 'react-native-elements';

import config from '../../../config/config';
import actions from '../../../app-actions/Actions.js';

var { width, height } = Dimensions.get('window');

export default class ImageItem extends Component {

    render() {
        let imageSource = "http://s.eatthis-cdn.com/media/images/ext/842849976/greasy-fast-food.jpg";
        if (this.props.item.photoUrl) {
            imageSource = this.props.item.photoUrl;
        }
        return (
            <Image
                resizeMethod='resize'
                resizeMode='cover'
                style={
                    {
                        borderRadius: this.props.boderradius
                            ?
                            this.props.boderradius
                            :
                            0,
                        width: this.props.width
                            ?
                            this.props.width : width, height: this.props.height ? this.props.height : height * 0.4,
                    }}

                source={{ uri: imageSource }} />
        )
    }
}   

