import React, { Component } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';

import Polyline from '@mapbox/polyline';
import MapView from 'react-native-maps';

import actions from '../../../app-actions/Actions';

var { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    height: height,
    width: width,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default class PlaceSave extends Component {

  constructor(props) {
    super(props);
    direct = this;
    this.state = {
      region: {
        latitude: this.props.navigation.state.params.currentPosition.latitude,
        longitude: this.props.navigation.state.params.currentPosition.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05
      },
      coords: [],
      reloadMap: true,
    }
    this.props.navigation.state.params.socket.on("change-position", function(data) {
      direct.setState({
        region: {
          latitude: data.latitude,
          longitude: data.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05
        }
      })
      actions.getDirections(data.latitude + "," + data.longitude, direct.props.navigation.state.params.item.latitude + "," + direct.props.navigation.state.params.item.longitude, direct);
    })
  }

  componentDidMount() {
    // await navigator.geolocation.getCurrentPosition((position) => {
    //   this.setState({
    //     region: {
    //       latitude: position.coords.latitude,
    //       longitude: position.coords.longitude,
    //       latitudeDelta: 0.05,
    //       longitudeDelta: 0.05
    //     }
    //   });
      actions.getDirections(this.state.region.latitude + "," + this.state.region.longitude, this.props.navigation.state.params.item.latitude + "," + this.props.navigation.state.params.item.longitude, this);
    // }, (error) => console.log(error), { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 })
    setTimeout(() => {
      this.setState({
        reloadMap: !this.state.reloadMap
      })
    }, 300)
  }

  static navigationOptions = ({ navigation }) => ({
    headerTitle: navigation.state.params.item.name
  });

  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          region={this.state.region}
          showsMyLocationButton={true}
          showsUserLocation={true}>
          <MapView.Marker onCalloutPress={() => this.props.navigation.goBack()} title={this.props.navigation.state.params.item.name} description={this.props.navigation.state.params.item.address} coordinate={{ latitude: this.props.navigation.state.params.item.latitude, longitude: this.props.navigation.state.params.item.longitude }} />
          <MapView.Polyline
            coordinates={this.state.coords}
            strokeWidth={4}
            strokeColor="red" />
        </MapView>
      </View>
    )
  }
}