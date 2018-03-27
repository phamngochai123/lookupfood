import React, { Component } from 'react';
import { View, Text, Image, Modal, TouchableHighlight } from 'react-native';
import { Icon, Rating, Button, Avatar } from 'react-native-elements';
import StarRating from 'react-native-star-rating';

export default class ModalItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false
        }
    }
    render() {
        return (
            <Modal
                animationType="slide"
                transparent={false}
                visible={this.props.modalVisible}
                onRequestClose={() => { alert("Modal has been closed.") }}
            >
                <View style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <View style={{ backgroundColor: 'yellow', height: 300 }}>
                        <View>
                            <Text>Hello World!</Text>

                            <TouchableHighlight onPress={() => {
                                this.setState({
                                    modalVisible: false
                                })
                            }}>
                                <Text>Hide Modal</Text>
                            </TouchableHighlight>

                        </View>
                    </View>
                </View>
            </Modal>
        )
    }
}