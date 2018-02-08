import React, { Component } from 'react';
import { StyleSheet,
	Text,
	TextInput,
	View,
	TouchableOpacity,
	StatusBar,
	Keyboard,
} from 'react-native';
import * as firebase from 'firebase';

firebase.initializeApp({
	apiKey: "AIzaSyBMITJ2zjgj_T6BEH_tnQniqsqnzUmvOcw",
	authDomain: "loginapp-50184.firebaseapp.com",
	databaseURL: "https://loginapp-50184.firebaseio.com",
	projectId: "loginapp-50184",
	storageBucket: "loginapp-50184.appspot.com",
	messagingSenderId: "689601054963"
})

export default class LoginForm extends React.Component {
	state = {
		id:'',
		password: '',
		error: '',
		loading: false,
	}
	onLoginPress() {
		this.setState({error: '', loading: true})

		let email = this.state.id;
		let password = this.state.password;
		firebase.auth().signInWithEmailAndPassword(email, password)
		.then(() => {
			this.setState({error:'', loading:false});
			//登入成功 跳頁至首頁 並且 關閉鍵盤
			// Actions.main(Keyboard.dismiss);
			this.props.handleLoginStatus()
		})
		.catch(() => {
			this.setState({error:'Authentication failed', loading:false})
		})
	}
	onSignUpPress() {
		this.setState({error: '', loading: true});
		let email = this.state.id;
		let password = this.state.password;
		firebase.auth().createUserWithEmailAndPassword(email, password)
		.then(() => {
			this.setState({error:'', loading:false});
			alert('註冊成功 請先登入');
			// 註冊成功 並且跳轉頁面
			this.props.nav.navigate('Login');
		})
		.catch((res) => {
			this.setState({error:'Authentication failed' + res, loading:false})
		})
	}
	showButtonText(){
		if(this.state.loading){
			return <Text style={styles.button}>讀取中...</Text>
		}else{
			if(this.props.type == 'Signup'){
				return <Text style={styles.button} onPress={this.onSignUpPress.bind(this)}>{this.props.type}</Text>
			}
			return <Text style={styles.button} onPress={this.onLoginPress.bind(this)}>{this.props.type}</Text>
		}
	}
	ShowComfirmText() {
		if (this.props.type === 'Signup') {
			console.log(this.props.type)
			return
			<TextInput
				style={styles.input}
				placeholder="Comfirm Password"
				secureTextEntry
				placeholderTextColor="rgba(255,255,255,0.7)"
				returnKeyType="go"
				onChangeText={(text) => {
					this.setState({
						password: text,
					});
				}}
				ref={(input) => this.passwordInput = input}
			/>
		}
	}
	render() {
		return(
			<View style={styles.container}>
				<Text style={styles.errorText}>{this.state.error}</Text>
				<TextInput
					style={styles.input}
					placeholder="Username or Email"
					placeholderTextColor="rgba(255,255,255,0.7)"
					onSubmitEditing={()=> this.passwordInput.focus() }
					keyboardType="email-address"
					autoCapitalize="none"
					autoCorrect={false}
					returnKeyType="next"
					selectionColor="rgba(255,255,255,0.7)"
					onChangeText={(text) => {
						this.setState({
							id:text,
						});
					}}
				/>
				<TextInput
					style={styles.input}
					placeholder="Password"
					secureTextEntry
					placeholderTextColor="rgba(255,255,255,0.7)"
					returnKeyType="go"
					onChangeText={(text) => {
						this.setState({
							password:text,
						});
					}}
					ref={(input) => this.passwordInput = input }
				/>
				{this.ShowComfirmText()}

				<TouchableOpacity style={styles.buttonContainer}>
					{this.showButtonText()}
				</TouchableOpacity>
			</View>
		)
	}
}
const styles = StyleSheet.create({
	container: {
		padding: 20,
	},
	input: {
		height: 40,
		backgroundColor: '#95a5a6',
		marginBottom: 10,
		color: 'white',
		paddingHorizontal: 10,
	},
	buttonContainer: {
		backgroundColor: '#2c3e50',
		paddingVertical: 15,
	},
	button: {
		textAlign: 'center',
		color: '#fff',
		fontWeight: '700',
	},
	errorText: {
		textAlign: 'center',
		color: '#c0392b',
		paddingBottom: 10,
	}
})