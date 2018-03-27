import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, Button, Dimensions } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';

import actions from '../../../app-actions/Actions';
import config from '../../../config/config';

import ImageItem from '../../cruid/component/ImageItem';
import Comment from '../../cruid/component/Comment';

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

export default class CommentLocalRestaurant extends Component {
    constructor(props) {
        super(props);
        CommentLocal = this;
        this.state = {
            detailComment: '',
            height: 50,
            page: 1,
            count: 0,
            isPostComment: false,
            checkNewComment: true,
        },
        this.props.screenProps.socket.on("have-new-comment", function (data) {
            CommentLocal.setState({
                page: 1,
                isPostComment: !CommentLocal.state.isPostComment
            })
        })
    }

    configApi = {
        apiPostComment: config.api_port ? config.api_url + ":" + config.api_port + config.apiPost + "comment" : config.api_url + config.apiPost + "comment",
        apiGetComment: config.api_port ? config.api_url + ":" + config.api_port + config.apiGet + "comments/" : config.api_url + config.apiGet + "comments/",
        apiGetCommentNew: config.api_port ? config.api_url + ":" + config.api_port + config.apiGet + "comments/" : config.api_url + config.apiGet + "comments/",
        apiCount: config.api_port ? config.api_url + ":" + config.api_port + config.apiCount + "comment/" + this.props.screenProps.item.id : config.api_url + config.apiCount + "comment/" + this.props.screenProps.item.id,
    }

    componentWillMount() {
        actions.getCount(this.configApi.apiCount, this);
    }

    _onEndReached = () => {
        let maxPage = Math.ceil(this.state.count / 10);
        if (this.state.page < maxPage + 1) {
            this.setState({
                page: this.state.page + 1
            })
        }
    }

    render() {
        let idRes = this.props.screenProps.isSavePlace ? this.props.screenProps.item.resId : this.props.screenProps.item.id;
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <View style={{ flex: 1 }}>
                    <ImageItem height={height / 4} item={this.props.screenProps.item} />
                </View>
                <View style={{ flex: 2, backgroundColor: 'white' }}>
                    {
                        this.props.screenProps.isLogin || this.props.isLoginReducer
                            ?
                            <View style={{ flexDirection: 'row', height: this.state.height, marginBottom: 5 }}>
                                <View style={{ flex: 5, borderBottomWidth: 1, borderColor: '#dddddd' }}>
                                    <TextInput underlineColorAndroid="transparent" value={this.state.detailComment} onChangeText={(text) => actions.updateComment(text, this)} multiline={true} onChange={(e) => actions.updateSize(e.nativeEvent.contentSize.height, this)} placeholder="Nhập bình luận" placeholderTextColor="#dddddd" style={{ width: width * 5 / 6, height: this.state.height }} />
                                </View>
                                {
                                    this.state.detailComment !== ''
                                        ?
                                        <TouchableOpacity onPress={() => actions.postComment(this.configApi.apiPostComment, idRes, this, this.props.screenProps.socket)} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                            <Icon name="send" type='font-awesome' color="blue" size={14} onPress={() => actions.postComment(this.configApi.apiPostComment, idRes, this, this.props.screenProps.socket)} />
                                        </TouchableOpacity>
                                        :
                                        <TouchableOpacity style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                            <Icon name="send" color="#dddddd" size={14} type='font-awesome' />
                                        </TouchableOpacity>
                                }
                            </View>
                            :
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <Text>Đăng nhập để bình luận</Text>
                                <Icon
                                    raised
                                    name='sign-in'
                                    type='font-awesome'
                                    color='#f50'
                                    size={12}
                                    onPress={() => this.props.screenProps.navigate("LoginScreen")} />
                            </View>
                    }
                    <View>
                        <Comment numLine={true} isPostComment={this.state.isPostComment} detailComment={this.state.detailComment} _onEndReached={this._onEndReached.bind(this)} isListAll={true} page={this.state.page} api={this.configApi.apiGetComment + idRes + "/" + (this.state.page - 1) * 5 + "/10"} idRes={this.props.screenProps.isSavePlace ? this.props.screenProps.item.resId : this.props.screenProps.item.id} />
                    </View>
                </View>
            </View>
        )
    }
}
module.exports = connect(function (state) {
    return { isLoginReducer: state.IsLogin }
})(CommentLocalRestaurant);