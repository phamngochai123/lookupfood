
import Polyline from '@mapbox/polyline';
import _ from 'lodash';
import config from '../config/config';

import { Alert, AsyncStorage, ToastAndroid, Keyboard } from 'react-native';

export default {
    async loadData(api, that, type) {
        console.log(api);
        try {
            await fetch(api)
                .then((response) => response.json())
                .then((responseJson) => {
                    console.log(responseJson);
                    if (responseJson.ads) {
                        if (that.state.page && type) {
                            if (type === 'refresh') {
                                that.setState({
                                    dataList: responseJson.ads,
                                    isRefresh: false,
                                    page: 1,
                                    total: responseJson.total
                                })
                            }
                            if (type === 'loadMore') {
                                let data = _.concat(that.state.dataList, responseJson.ads);
                                that.setState({
                                    dataList: data,
                                    isRefresh: false,
                                    page: that.state.page + 1,
                                    total: responseJson.total
                                })
                            }
                        }
                    }
                    else {
                        responseJson.map((data) => {
                            for (let name in data) {
                                if (typeof data[name] == "string") {
                                    let content = data[name];
                                    content = content.replace(/&#39;/g, "'");
                                    content = content.replace(/&quot;/g, '"');
                                    content = content.replace(/&lt;/g, '<');
                                    content = content.replace(/&gt;/g, ">");
                                    content = content.replace(/&amp;/g, "&");
                                    data[name] = content;
                                }
                            }
                        })
                        that.setState({
                            visible: false,
                        })
                        if (that.state.page && type) {
                            if (type === 'refresh') {
                                that.setState({
                                    dataList: responseJson,
                                    isRefresh: false,
                                    page: 1
                                })
                            }
                            if (type === 'loadMore') {
                                let data = _.concat(that.state.dataList, responseJson);
                                that.setState({
                                    dataList: data,
                                    isRefresh: false,
                                    page: that.state.page + 1
                                })
                            }
                            if (type === 'near') {
                                that.setState({
                                    dataListNear: responseJson,
                                    isRefresh: false,
                                })
                            }

                        }
                        else {
                            if (type === 'commentLocal') {
                                if (responseJson.length > 0) {
                                    let data = [];
                                    if (that.props.page !== 1)
                                        data = _.concat(that.state.dataList, responseJson);
                                    else
                                        data = responseJson
                                    that.setState({
                                        dataList: data
                                    })
                                }
                            }
                            else {
                                that.setState({
                                    dataList: responseJson,
                                    isRefresh: false
                                })
                            }

                        }
                    }

                })
        } catch (error) {
            setTimeout(() => {
                that.setState({
                    visible: false,
                })
            }, 500);
            if (type == 'refresh')
                alert("Kết nối bị lỗi. Vui lòng thử lại sau !!!");

            console.log(api);
            console.log(error);
        }
    },

    getCategory(api, that) {
        console.log(api);
        try {
            fetch(api)
                .then((response) => response.json())
                .then((responseJson) => {
                    that.setState({
                        dataCategory: responseJson
                    })
                })
        } catch (error) {
            console.log(error);
        }
    },

    async getCount(api, that) {
        try {
            await fetch(api)
                .then((response) => response.json())
                .then((responseJson) => {
                    that.setState({
                        count: responseJson[0].count
                    })
                })
        } catch (error) {
            console.log(error);
        }
    },
    async checkCount(api, that) {
        console.log(api);
        try {
            await fetch(api)
                .then((response) => response.json())
                .then((responseJson) => {
                    that.state.checkCount = responseJson[0].count
                    that.setState(that.state);
                })
        } catch (error) {
            console.log(error);
        }
    },
    async getStar(api, that) {
        try {
            await fetch(api)
                .then((response) => response.json())
                .then((responseJson) => {
                    that.setState({
                        star: responseJson[0].star
                    })
                })
        } catch (error) {
            console.log(error);
        }
    },

    async getUserRatting(api, that) {
        try {
            await fetch(api)
                .then((response) => response.json())
                .then((responseJson) => {
                    that.setState({
                        itemRatting: {
                            id: responseJson[0].id,
                            star: responseJson[0].star,
                        }
                    })
                })
        } catch (error) {
            console.log(error);
        }
    },

    async getDirections(startLoc, destinationLoc, that) {
        console.log(`https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${destinationLoc}`);
        try {
            let resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${destinationLoc}`)
            let respJson = await resp.json();
            if (respJson.status === "OK") {
                if (that.state.coords) {
                    let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
                    let coords = [];
                    coords.push({
                        latitude: parseFloat(startLoc.split(",")[0]),
                        longitude: parseFloat(startLoc.split(",")[1])
                    });
                    points.map((point, index) => {
                        coords.push({
                            latitude: point[0],
                            longitude: point[1]
                        })
                    });
                    coords.push({
                        latitude: parseFloat(destinationLoc.split(",")[0]),
                        longitude: parseFloat(destinationLoc.split(",")[1])
                    })
                    that.state.coords = coords;
                }
                if (that.state.distance) {
                    that.state.distance = respJson.routes[0].legs[0].distance.text;
                }
                that.setState(that.state);

            } else {
                that.setState(that.state);
            }


        } catch (error) {
            return error
        }
    },

    async saveRestaurant(idRes, that) {
        Alert.alert(
            'Lưu ?',
            'Bạn có muốn lưu lại ' + that.props.item.name + ' ?',
            [
                { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                {
                    text: 'OK', onPress: async () => {
                        let fbId = await AsyncStorage.getItem('fbId');
                        await fetch(that.configApi.apiPostSavePlace, {
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                fbId: fbId,
                                resId: idRes,
                            })
                        })
                        ToastAndroid.show('lưu thành công', ToastAndroid.SHORT);
                        this.loadData(that.configApi.apiList + fbId, that);
                        if (that.props.checkSave) {
                            that.props.checkSave();
                        }
                    }
                },
            ],
            { cancelable: false }
        )


    },

    async removeSavedRestaurant(idRes, that, name) {
        let resName = that.props.item ? that.props.item.name : name;
        Alert.alert(
            'Xóa ?',
            'Bạn có muốn xóa ' + resName + ' khỏi danh sách đã lưu?',
            [
                { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                {
                    text: 'OK', onPress: async () => {
                        let fbId = await AsyncStorage.getItem('fbId');
                        await fetch(that.configApi.apiPostRemovePlace, {
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                fbId: fbId,
                                resId: idRes,
                            })
                        })
                        ToastAndroid.show('Xóa thành công', ToastAndroid.SHORT);
                        this.loadData(that.configApi.apiList + fbId, that);
                        if (that.props.checkSave) {
                            that.props.checkSave();
                        }
                        if (that.props.screenProps.checkSave) {
                            that.props.screenProps.checkSave();
                        }
                    }
                },
            ],
            { cancelable: false }
        )
    },


    async postComment(api, idRes, that, socket) {
        Keyboard.dismiss();
        let fbId = await AsyncStorage.getItem('fbId');
        let char2entity = { "'": '&#39;', '"': '&quot;', '<': '&lt;', '>': '&gt;', '&': '&amp;' };
        let comment = '';
        for (let i = 0; i < that.state.detailComment.length; i++) {
            var ch = that.state.detailComment.charAt(i);
            comment += char2entity[ch] || ch;
        }
        await fetch(api, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                fbId: fbId,
                resId: idRes,
                comment: comment
            })
        })
        if (socket) {
            socket.emit("client-post-comment", idRes);
        }
        if (that.state.page) {
            that.setState({
                page: 1,
                detailComment: '',
                height: 40,
            })
        }
        else {
            that.setState({
                detailComment: '',
                height: 40,
            })
        }

    },

    updateSize(height, that) {
        that.setState({
            height: height + 30
        });
    },

    updateComment(text, that) {
        that.setState({
            detailComment: text
        })
    },
    async getInforUser(api, that) {
        try {
            await fetch(api)
                .then((response) => response.json())
                .then((responseJson) => {
                    that.setState({
                        userInfo: responseJson[0]
                    })
                })
        } catch (error) {
            console.log(error);
        }
    },
    htmlspecialchars(str) {
        if (typeof (str) == "string") {
            str = str.replace(/&/g, "&");
            str = str.replace(/"/g, '"');
            str = str.replace(/'/g, "'");
            str = str.replace(/</g, "<");
            str = str.replace(/>/g, ">");
        }
        return str;
    },

    un_htmlspecialchars(str) {
        if (typeof (str) == "string") {
            str = str.replace(/>/ig, ">");
            str = str.replace(/</ig, "<");
            str = str.replace(/'/g, "'");
            str = str.replace(/"/ig, '"');
            str = str.replace(/&/ig, '&');
        }
        return str;
    }
}