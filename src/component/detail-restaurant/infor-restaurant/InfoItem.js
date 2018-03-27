import React, { Component } from 'react';
import { View, Text, Image, TouchableHighlight, Dimensions } from 'react-native';
import { Icon, Rating, Button, Avatar } from 'react-native-elements';
import StarRating from 'react-native-star-rating';
import Modal from 'react-native-modal';

var { width, height } = Dimensions.get('window');
export default class InfoItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            star: 0
        }
    }
    render() {
        let arrayRatting = [];
        for (let i = 1; i < 6; i++) {
            arrayRatting.push(
                <StarRating
                    disabled={true}
                    starColor='black'
                    maxStars={5}
                    rating={i}
                />
            )
        }
        return (
            <View style={{ flex: 1, flexDirection: 'row', height: 20, marginTop: 15 }}>
                <Modal
                    isVisible={this.state.modalVisible}
                    animationIn="slideInUp"
                    animationOut="slideOutUp"
                >
                    <View style={{ height: height / 2, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
                        <View style={{ marginBottom: 20 }}>
                            <Text style={{ fontSize: 18 }}>{this.props.star ? "Sửa đánh giá" : "Đánh giá"}</Text>
                        </View>
                        <View>
                            <StarRating
                                starColor='yellow'
                                maxStars={5}
                                rating={this.state.star}
                                selectedStar={(star) => this.setState({ star: star })}
                            />
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 50 }}>
                            <Button
                                onPress={() => {
                                    this.setState({
                                        modalVisible: false,
                                        star: 0
                                    })
                                }}
                                iconLeft
                                icon={{ name: 'times', type: 'font-awesome' }}
                                title='HỦY' />
                            <Button
                                onPress={() => {
                                    this.props.star ? this.props.starSelected(this.state.star, "update") : this.props.starSelected(this.state.star, "new")
                                    this.setState({
                                        modalVisible: false,
                                        star: 0
                                    })
                                }
                                }
                                disabled={this.state.star ? false : true}
                                backgroundColor="#00BFFF"
                                iconRight
                                icon={{ name: 'send' }}
                                title='GỬI' />
                        </View>
                    </View>
                </Modal>
                {
                    this.props.name !== 'star'
                        ?
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <Icon
                                size={20}
                                name={this.props.name ? this.props.name : 'info'}
                                type='font-awesome' />
                        </View>
                        :
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        </View>
                }

                <View style={{ flex: 7, justifyContent: 'center' }}>
                    <Text style={{ fontSize: this.props.name == "star" ? 18 : 10 }}>{this.props.name !== 'star' ? this.props.text : !this.props.isLogin ? "Đăng nhập để đánh giá" : this.props.text}</Text>
                </View>
                {
                    this.props.isLogin
                        ?
                        this.props.name === 'star'
                            ?
                            <View style={{ flex: 7, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                                <View style={{ flex: 1 }}>
                                    <StarRating
                                        starSize={12}
                                        disabled={true}
                                        starColor='black'
                                        maxStars={5}
                                        rating={this.props.star}
                                    />
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Icon
                                        raised
                                        name='edit'
                                        type='font-awesome'
                                        color='#f50'
                                        size={12}
                                        onPress={() => this.setState({ modalVisible: true })} />
                                </View>
                            </View>
                            :
                            null
                        :
                        this.props.name === 'star'
                            ?
                            <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                                <Icon
                                    raised
                                    name='sign-in'
                                    type='font-awesome'
                                    color='#f50'
                                    size={12}
                                    onPress={() => this.props.navigate("LoginScreen")} />
                            </View>
                            :
                            null
                }
            </View>
        )
    }
}