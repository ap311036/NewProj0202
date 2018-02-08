import React, { Component } from 'react';
import { View, Text, } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import LoginScreen from '../screens/LoginScreen';
import Main from '../screens/Main';
import Menu from '../screens/Menu';

const TabsNavigator = TabNavigator({
    Main: {
        screen: Main,
        navigationOptions: {
            tabBarIcon: ({ focused, tintColor }) =>
                (
                    focused
                        ? <Icon name="ios-home" size={30} color={tintColor} />
                        : <Icon name="ios-home-outline" size={30} color={tintColor} />
                ),
        }
    },
    Menu: {
        screen: Menu,
        navigationOptions: {
            tabBarIcon: ({ focused, tintColor }) =>
                (
                    focused
                        ? <Icon name="ios-home" size={30} color={tintColor} />
                        : <Icon name="ios-home-outline" size={30} color={tintColor} />
                ),
        }
    },
},{
    tabBarOptions: {
        activeTintColor: 'black',
        inactiveTintColor: 'black',
        showLabel: false,
        labelStyle: {
            fontSize: 12
        }
    },
    // animationEnabled: true, 
})


const RootStackNavigator = StackNavigator(
    {
        LoginScreen: {
            screen: LoginScreen,
        },
        TabsNavigator: {
            screen: TabsNavigator,
            navigationOptions: {
                gesturesEnabled: false,
            }
        }
    },
    {
        navigationOptions: () => ({
            headerTitleStyle: {
                fontWeight: 'normal',
            },
        }),
    }
);

export default class RootNavigator extends Component {
    render() {
        return (
            <RootStackNavigator />
        );
    }
}
