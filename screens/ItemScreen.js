import React, { Component } from 'react';
import {View, Text, Image, Dimensions, StyleSheet, Slider } from 'react-native';
import {ButtonGroup} from 'react-native-elements'; // 0.17.0
import Icon from 'react-native-vector-icons/Ionicons';

const imageStyle = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width / 2,
};

export default class ItemScreen extends Component {
	static navigationOptions = ({ navigation }) => ({
		title: `${ navigation.state.params.ChName }`,
		panHandlers: null,
		headerLeft: (
			<Icon name="ios-arrow-back" size={30} style={{ paddingLeft: 10, paddingRight: 30 }} color='black'
				onPress={() => navigation.goBack()}
			/>
		),
		headerRight: null,
	})
	constructor(props) {
		super()
		this.state = {
			selectedIndex: 2,
			Value:2
		}
		this.updateIndex = this.updateIndex.bind(this)
	}

	updateIndex (selectedIndex) {
		this.setState({selectedIndex})
	}
	render() {
		const itemObj = this.props.navigation.state.params;
		const buttons = ['無糖','微糖', '半糖', '少糖','正常']
		const { selectedIndex } = this.state
		return (
			<View>
				<Image
					style={imageStyle}
					source={{uri: itemObj.uri}}
				/>
				<View style={styles.header}>
					<Text style={styles.title}>{itemObj.ChName}</Text>
					<Text>{itemObj.EnName}</Text>
				</View>
				<View>
					<View>
						<ButtonGroup
						selectedButtonStyle={{backgroundColor: 'red',}}
						onPress={this.updateIndex}
						selectedIndex={selectedIndex}
						buttons={buttons}
						containerStyle={{height: imageStyle.height /4 }}
						/>
					</View>
					<View  style={styles.ice}>
						<Text>冰塊: {this.state.value}</Text>
						<Slider
							value={this.state.value}
							onValueChange={(value) => this.setState({value})}
							minimumValue={0}
							maximumValue={10}
							step={2}
							 />
						</View>
				</View>
				<Text> {JSON.stringify(this.props.navigation.state.params)} </Text>
			</View>
		);
	}
}
const styles = StyleSheet.create({
	header: {
		flexDirection: 'row',
		alignItems: 'flex-end',
		height: 50,
		paddingHorizontal: 20,
	},
	title:{
		fontSize: 24,
		marginRight: 20,
	},
	ice: {
		paddingHorizontal: 10,
	}
});