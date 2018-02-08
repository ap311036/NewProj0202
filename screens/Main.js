import React, { Component } from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity, ScrollView, Image, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Menu from './Menu';
const backgroundColor = '#D4D47D';

export default class Main extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: (
            <Image
                style={{ height: 25, width: 200, }}
                source={require('../assets/images/milkshop-logo-5004-new.png')}
            />
        ),
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
    _renderHorizontalScrollView = () => {
        const imageStyle = {
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').width / 2,
        };
        setTimeout(() => {
            // this.scrollTo({ x: 0, y:imageStyle.width, animated: true })
        }, 1000);
        return (
            <ScrollView pagingEnabled directionalLockEnabled horizontal showsHorizontalScrollIndicator={false} style={{flexGrow:0}}>
                <Image
                    source={require('../assets/images/Banner/0915banner-2-1-940x400-940x400_c.jpg')}
                    style={imageStyle}
                    resizeMode="cover"
                />
                <Image
                    source={require('../assets/images/Banner/BANNER-CC-940x400-940x400_c.jpg')}
                    style={imageStyle}
                    resizeMode="cover"
                />
                <Image
                    source={require('../assets/images/Banner/Banner2-940x400_c.jpg')}
                    style={imageStyle}
                    resizeMode="cover"
                />
                <Image
                    source={require('../assets/images/Banner/Milk-BANNER-940x400_c.jpg')}
                    style={imageStyle}
                    resizeMode="cover"
                />
            </ScrollView>
        );
    };
    render() {
        return (
            <View style={styles.container}>
                    {this._renderHorizontalScrollView()}
                    <Menu nav={this.props.navigation}></Menu>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: backgroundColor
    },
    Subcontainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'pink'
    }
});