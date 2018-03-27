import React, { Component } from 'react';
import {
    BackHandler,
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions
} from 'react-native';

import Carousel from 'react-native-snap-carousel';
import Swiper from 'react-native-swiper';
import PhotoView from 'react-native-photo-view';

import config from '../../../config/config';
import actions from '../../../app-actions/Actions';

var { width, height } = Dimensions.get('window');

var styles = StyleSheet.create({
    wrapper: {
        backgroundColor: 'black'
    },
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#97CAE5',
    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92BBD9',
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    },
    image: {
        width: width,
        height: height / 3,
        flex: 1
    },
})

export default class ImageSwiper extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataList: this.props.navigation.state.params.dataList,
            page: 0,
            index: this.props.navigation.state.params.index,
            checkSwiper: true,
        }
    }

    configApi = {
        apiList: config.api_port ? config.api_url + ':' + config.api_port + config.apiGet + 'images/restaurant/' + this.props.navigation.state.params.id : config.api_url + config.apiGet + 'images/restaurant/' + this.props.navigation.state.params.id,
        //apiCount: config.api_port ? config.api_url + ':' + config.api_port + config.apiCount + 'images/restaurant/' + this.props.navigation.state.params.id : config.api_url + config.apiCount + 'images/restaurant/' + this.props.navigation.state.params.id
    }

    componentDidMount() {
        let indexImage = this.props.navigation.state.params.index == 0 ? 1 : this.props.navigation.state.params.index;
        let page = Math.ceil(indexImage / 12);
        if(indexImage % 12 == 11 && indexImage < this.props.count){
            actions.loadData(this.configApi.apiList + "/" + (page * 12) + "/12", this, 'loadMore');
        }
        else{
            this.state.page = page;
            this.setState(this.state);
        }
    }

    // componentWillMount() {
    //     BackHandler.addEventListener('BackPress', function () {
    //         const { dispatch } = this.props.navigation;
    //         //if (nav.routes[0].routeName === 'ImageSwiperScreen') {
    //         //     this.props.navigation.goBack();
    //         //     return;
    //         // }
    //         // if (shouldCloseApp(nav)) return false
    //         dispatch({ type: 'Navigation/BACK' });
    //         return true;
    //     }.bind(this));
    // }
    loadMoreImage(index) {
        console.log(index, this.state.page, this.props.navigation.state.params.count);
        if (index == this.state.dataList.length - 1 && this.state.page < Math.ceil(this.props.navigation.state.params.count/12)) {
            if(this.state.checkSwiper)
                this.state.checkSwiper = false;
            this.state.index = index;
            this.setState(this.state);
            actions.loadData(this.configApi.apiList + "/" + (this.state.page) * 12 + "/12", this, 'loadMore');
        }
    }
    render() {
        return (
            <Swiper onIndexChanged={(index) => this.loadMoreImage(index)} loop={false} style={styles.wrapper} index={this.state.checkSwiper ? this.props.navigation.state.params.index  : this.state.index} showsPagination={false} loadMinimal={true} >
                {
                    this.state.dataList.map((data) => {
                        return (
                            <View style={styles.slide1}>
                                <Image resizeMethod='resize' resizeMode='contain' style={styles.image} source={{ uri: data.link }} />
                                {/* <PhotoView
                                    source={{ uri: data.link }}
                                    minimumZoomScale={1}
                                    maximumZoomScale={3}
                                    androidScaleType="center"
                                    style={{ width: width, height: height/2 }} /> */}
                            </View>
                        )

                    })
                }

            </Swiper>
        )
    }
}