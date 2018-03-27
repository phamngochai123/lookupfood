import React, {Component} from 'react';
import {Text} from 'react-native';

export default class DetailComment extends Component{
    render(){
        let comment = this.props.commentDetail;
        comment = comment.replace(/&#39;/g, "'");
        comment = comment.replace(/&quot;/g, '"');
        comment = comment.replace(/&lt;/g, '<');
        comment = comment.replace(/&gt;/g, ">");
        comment = comment.replace(/&amp;/g, "&");
        return(
            <Text numberOfLines={this.props.numLine ? null : 1} style={{ fontSize: 10 }}>{comment}</Text>
        )
    }
}