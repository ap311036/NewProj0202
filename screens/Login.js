import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
	Image,
	Button,
	KeyboardAvoidingView,
	TouchableOpacity,
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import LoginForm from '../components/LoginForm';
// import Signup from '../screens/Signup';

export default class LoginScreen extends Component {
	state = {
		isLogin: 'false',
		type: 'Login'
	}
	static navigationOptions = {
		header: null,
	};
	_handleLoginStatue() {
		this.setState({isLogin: 'true'});
		// this.props.navigation.navigate('Screen7');
		console.log(JSON.stringify(this.props.navigation))
	}
	
	render() {
		return (
			<KeyboardAvoidingView behavior="padding" style={styles.container}>
				<View style={styles.logoContainer}>
					<Image
						style={styles.logo}
						source={require('../assets/images/icon.png')}
					/>
					<Text style={styles.title}>an app made by Snoop</Text>
				</View>
				<View style={styles.formContainer}>
					<LoginForm type={this.state.type} nav={this.props.navigation} handleLoginStatus={this._handleLoginStatue.bind(this)}/>
				</View>
				<View style={styles.signupContainer}>
					<Text style={styles.singupText}>Don't have an account yet?</Text>
					<Text style={styles.singupText}>{this.state.isLogin}</Text>
					<TouchableOpacity onPress={()=>this.setState({
						type: this.state.type == 'Login' ? 'Signup' : 'Login'
						})}>
						<Text style={styles.singupButton}>
							{this.state.type == 'Login' ? 'Signup' : 'Login'}
						</Text>
					</TouchableOpacity>
				</View>
			</KeyboardAvoidingView>
		)
	}
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#34495e',
	},
	logoContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	formContainer: {

	},
	logo: {
		width: 64,
		height: 64,
	},
	title: {
		color: 'white',
		marginTop: 10,
		width: 160,
		textAlign: 'center',
		opacity: 0.9,
	},
	signupContainer: {
		alignItems: 'center',
		justifyContent: 'center',
		marginVertical: 20,
		flexDirection: 'row',
	},
	singupText: {
		color: 'rgba(255,255,255,0.6)',
		marginRight: 20,
		fontSize: 16,
	},
	singupButton: {
		fontWeight: '700',
		color: 'white',
		fontSize: 16,
	}
});