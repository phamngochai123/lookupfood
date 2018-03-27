import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  DrawerLayoutAndroid,
  FlatList,
  Picker,
  Image,
  Dimensions,
  TextInput,
  TouchableOpacity,
} from 'react-native';

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

export default class Home extends Component {

  message() {
    const { navigate } = this.props.navigation;
    navigate('Screen_HomeNews');
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
          <Image source={require("../../../public/images/foody-256x256_icon-discover-636282198656549126.png")} />
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Xin chào Fooddee</Text>
          <Text>Đăng nhập để trải nghiệm tốt hơn</Text>
        </View>
        <View style={{ flex: 1, width: width * 0.7, }}>
          <TouchableOpacity style={{ height: 30, borderRadius: 5, backgroundColor: '#F5F5F5', justifyContent: 'center', alignItems: 'center' }} onPress={this.message.bind(this)}>
            <Text>Tìm kiếm đồ ăn, tên, địa điểm...</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 3, alignItems: 'center', }}>
          <TouchableOpacity style={{ alignItems: 'center', }} onPress={this.message.bind(this)}>
            <Image resizeMode='cover' style={[styles.image_cate, { overflow: 'visible' }]}
              source={require("../../../public/images/foody-pic_category-discovery-636317565534753252.png")} />
            <Image resizeMode='cover' style={[styles.image_icon, { overflow: 'visible' }]}
              source={require("../../../public/images/foody-256x256_icon-discover-636282198656549126.png")} />
            <Text style={{ fontWeight: 'bold' }}>Khám phá</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text_input: {
    width: width * 0.7,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
  },
  image_cate: {
    width: width * 0.3,
    height: height * 0.1,
    borderRadius: 5,
  },
  image_icon: {
    width: width * 0.1,
    height: height * 0.06,
    marginTop: height * -0.025,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 50,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  title: {
    paddingBottom: 16,
    textAlign: 'center',
    color: '#404d5b',
    fontSize: 20,
    fontWeight: 'bold',
    opacity: 0.8,
  },
  input: {
    marginTop: 4,
  },
});
