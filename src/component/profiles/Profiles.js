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

import FBSDK, { LoginManager } from 'react-native-fbsdk';

import config from '../../config/config.js';
import * as actions from '../../actions/index';
import {connect} from 'react-redux';

const {
  LoginButton,
	AccessToken
} = FBSDK;

var isLogin = false;
class Profiles extends Component {

	constructor(props) {
		super(props);
		this.state = {
			isLogin: false,
			fbId: '',
			fbName: '',
			fbPicture: '',
		}
	}

	configApi = {
		apiPost: config.api_port ? config.api_url + ":" + config.api_port + config.apiPost + "user" : config.api_url + config.apiPost + "user",
	}

	saveToken = async (data, that) => {
		try {
			let accessToken = data.accessToken.toString();
			let api = "https://graph.facebook.com/me?fields=link,name,age_range,cover,first_name,picture,verified,locale&access_token=" + accessToken;
			let fbId;
			let fbName;
			let fbPicture;
			await fetch(api)
				.then((response) => response.json())
				.then((responseJson) => {
					fbId = responseJson.id;
					fbName = responseJson.name;
					fbPicture = responseJson.picture.data.url;
					fetch(that.configApi.apiPost, {
						method: 'POST',
						headers: {
							'Accept': 'application/json',
							'Content-Type': 'application/json',
						},
						body: JSON.stringify(responseJson)
					})
				})
				.catch((error) => {
					console.error(error);
				});
			await AsyncStorage.setItem('accessToken', accessToken);
			await AsyncStorage.setItem('fbId', fbId);
			await AsyncStorage.setItem('fbName', fbName);
			await AsyncStorage.setItem('fbPicture', fbPicture);
			that.state.isLogin = true;
			that.state.fbId = fbId;
			that.state.fbName = fbName;
			that.state.fbPicture = fbPicture;
			this.props.dispatch(actions.logIn());
			ToastAndroid.show('Đăng nhập thành công', ToastAndroid.SHORT);
			that.setState(that.state);
			this.props.screenProps.logIn();
		} catch (error) {
			console.log(error);
		}
	}

	getToken = async () => {
		try {
			const act = await AsyncStorage.getItem('accessToken');
			const fb_Id = await AsyncStorage.getItem('fbId');
			const fb_Name = await AsyncStorage.getItem('fbName');
			const fb_Picture = await AsyncStorage.getItem('fbPicture');
			console.log(act, fb_Id, fb_Name, fb_Picture);
			if (act !== null) {
				this.setState({
					isLogin: true,
					fbId: fb_Id,
					fbName: fb_Name,
					fbPicture: fb_Picture,
				})
			}
		} catch (error) {
			console.log(error);
		}
	}

	_fbAuth() {
		let that = this;
		LoginManager.logInWithPublishPermissions(['publish_actions']).then(
			function (result) {
				if (result.isCancelled) {
					console.log('Login cancelled');
				} else {
					console.log('Login success with permissions: '
						+ JSON.stringify(result));
					AccessToken.getCurrentAccessToken().then(
						(data) => {
							that.saveToken(data, that);
							console.log(data.accessToken.toString());
						}
					)
				}
			},
			function (error) {
				console.log('Login fail with error: ' + error);
			}
		);
	}

	checkLogout() {
		Alert.alert(
			'Đăng xuất',
			'Bạn có muốn đăng xuất khỏi ứng dụng?',
			[
				{ text: 'Hủy', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
				{ text: 'Có', onPress: () => this._fbLogout() },
			],
			{ cancelable: false }
		)
	}

	async _fbLogout() {
		this.state.isLogin = false;
		await AsyncStorage.removeItem('accessToken');
		await AsyncStorage.removeItem('fbId');
		await AsyncStorage.removeItem('fbName');
		await AsyncStorage.removeItem('fbPicture');
		LoginManager.logOut();
		this.props.dispatch(actions.logOut());
		this.props.screenProps.logOut();
		ToastAndroid.show('Đăng xuất thành công', ToastAndroid.SHORT);
		this.setState(this.state);
	}
	componentWillMount() {
		this.getToken();
	}

	componentWillReceiveProps(nextProps){
		if(nextProps.checkLogin == true && this.props.checkLogin == false){
			this.getToken();
		}
	}

	render() {
		return (
			<View style={styles.container}>
				{
					this.state.isLogin
						?
						<View style={{ flex: 1 }}>
							<View style={{ flex: 1, flexDirection: 'row' }}>
								<View style={styles.viewAvatar}>
									<Avatar
										medium
										rounded
										source={{ uri: this.state.fbPicture }}
										onPress={() => this.props.navigation.navigate("MyProfile",{fbId: this.state.fbId})}
										activeOpacity={0.7}
									/>
								</View>
								<View style={styles.viewName}>
									<Text style={{ fontSize: 20 }}>{this.state.fbName}</Text>
								</View>
							</View>
							<View style={styles.signOut}>
								<Icon
									name='sign-out'
									type='font-awesome'
									color='red'
									size={40}
									onPress={this.checkLogout.bind(this)} />
							</View>
						</View>
						:
						<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
							<SocialIcon
								title='Sign In With Facebook'
								button
								type='facebook'
								style={{ width: 250 }}
								onPress={this._fbAuth.bind(this)}
							/>
						</View>
				}
			</View>
		)
	}
}
module.exports = connect(function (state) {
    return { checkLogin: state.IsLogin }
})(Profiles);
const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	viewAvatar: {
		flex: 1,
		alignItems: 'center',
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