import React, { Component } from 'react';
import { View, Text, Image, ScrollView, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';
import Carousel from 'react-native-snap-carousel';
import RNImmediatePhoneCall from 'react-native-immediate-phone-call';
import actions from '../../app-actions/Actions';

var { width, height } = Dimensions.get('window');
export default class DetailMotel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inFo: {
        images: []
      }
    }
  }

  configApi = {
    apiInFo: "https://gateway.chotot.com/v1/public/ad-listing/" + this.props.navigation.state.params.item.list_id
  }

  _renderItem({ item, index }) {
    return (
      <View style={{ flex: 1 }}>
        <Image resizeMethod='resize' resizeMode='cover' style={{
          width: width,
          height: height / 3,
          flex: 1
        }} source={{ uri: item }} />
      </View>
    );
  }

  callPhone = () => {
    RNImmediatePhoneCall.immediatePhoneCall(this.state.inFo.phone);
  }

  componentDidMount() {
    try {
      fetch("https://gateway.chotot.com/v1/public/ad-listing/" + this.props.navigation.state.params.item.list_id)
        .then((response) => response.json())
        .then((responseJson) => {
          this.setState({
            inFo: responseJson.ad
          })
        })
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    console.log(this.state.inFo);
    return (
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Carousel
          data={this.state.inFo.images}
          renderItem={this._renderItem}
          sliderWidth={width}
          itemWidth={width}
          autoplay={true}
        />
        <TouchableOpacity onPress={this.callPhone}>
          <Text style={{ fontWeight: 'bold', fontSize: 15, color: 'blue' }}>{this.state.inFo.phone}</Text>
        </TouchableOpacity>
        <Text style={{ fontWeight: 'bold', fontSize: 15 }}>{this.state.inFo.price_string}</Text>
        <Text style={{ fontWeight: 'bold', fontSize: 15 }}>{this.state.inFo.address}</Text>
        <Text style={{ fontWeight: 'bold' }}>{this.state.inFo.subject}</Text>
        <Text style={{}}>{this.state.inFo.body}</Text>
      </ScrollView>
    )
  }
}
const styles = StyleSheet.create({
  contentContainer: {
    paddingVertical: 20
  }
});