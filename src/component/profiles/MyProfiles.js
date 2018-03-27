import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    TextInput,
    Dimensions,
    TouchableOpacity,
    Text,
    Alert,
    AsyncStorage,
    ToastAndroid
} from 'react-native';

import { SocialIcon, Button, Icon, Avatar } from 'react-native-elements';
import config from '../../config/config.js';
import actions from '../../app-actions/Actions';
export default class MyProfiles extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userInfo: {}
        }
    }

    configApi = {
        apiInfo: config.api_port ? config.api_url + ":" + config.api_port + config.apiGet + "info/user/" + this.props.navigation.state.params.fbId : config.api_url + config.apiPost + "info/user/" + this.props.fbId,
    }

    componentDidMount() {
        actions.getInforUser(this.configApi.apiInfo, this);
    }


    render() {
        return (
            <View style={styles.container}>
                <View style={{ flex: 1 }}>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        {/* <View style={styles.viewName}>
                                <Text style={{ fontSize: 20 }}>{this.state.userInfo.fbName ? this.state.userInfo.fbName : 'loading...'}</Text>
                            </View> */}
                        <View style={styles.viewName}>
                            <Text style={{ fontSize: 15 }}>Ảnh đại diện</Text>
                        </View>
                        <View style={styles.viewAvatar}>
                            <Avatar
                                medium
                                rounded
                                source={{ uri: this.state.userInfo.picture ? this.state.userInfo.picture : "https://camo.githubusercontent.com/341831200626efe3e0cf83317801fcac2200fbe2/68747470733a2f2f662e636c6f75642e6769746875622e636f6d2f6173736574732f323639323831302f323130343036312f34643839316563302d386637362d313165332d393230322d6637333934306431306632302e706e67" }}
                                onPress={() => console.log("Works!")}
                                activeOpacity={0.7}
                            />
                        </View>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <View style={styles.viewName}>
                            <Text style={{ fontSize: 15 }}>Tên hiển thị</Text>
                        </View>
                        <View style={styles.viewAvatar}>
                            <Text style={{ fontSize: 20 }}>{this.state.userInfo.fbName ? this.state.userInfo.fbName : 'loading...'}</Text>
                        </View>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <View style={styles.viewName}>
                            <Text style={{ fontSize: 15 }}>Facebook id</Text>
                        </View>
                        <View style={styles.viewAvatar}>
                            <Text style={{ fontSize: 20 }}>{this.state.userInfo.fbId ? this.state.userInfo.fbId : 'loading...'}</Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    viewAvatar: {
        flex: 1,
        justifyContent: 'center',

    },
    viewName: {
        flex: 1,
        justifyContent: 'center',
    },
    signOut: {
        flex: 1
    },
    buttonLogin: {
        width: 300
    }
})