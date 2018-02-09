import React, { Component } from 'react';
import { View, Text, } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default class ItemScreen extends Component {
	static navigationOptions = ({ navigation }) => ({
		title: `${ navigation.state.params.name }`,
		panHandlers: null,
		headerLeft: (
			<Icon name="ios-apps" size={30} style={{ paddingLeft: 10, paddingRight: 30 }} color='black'
				onPress={() => navigation.navigate('Screen10')}
			/>
		),
		headerRight: (
			<Icon name="ios-paper-plane-outline" size={30} style={{ paddingRight: 10, paddingLeft: 30 }} color='black'
				onPress={() => navigation.navigate('Screen9')}
			/>
		),
	})
	

	render() {
		return (
			<View>
				<Text> {JSON.stringify(this.props.navigation)} </Text>
			</View>
		);
	}
}
