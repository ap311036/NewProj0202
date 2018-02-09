import React, { Component } from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity, Image, ScrollView, ActivityIndicator, RefreshControl } from 'react-native';
import { List, ListItem, Avatar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import BuyText from '../components/BuyText'
import * as firebase from 'firebase';
const backgroundColor = '#D4D47D';

export default class Menu extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: (
            <Image
                style={{ height: 25, width: 200, }}
                source={require('../assets/images/milkshop-logo-5004-new.png')}
            />
        ),
        panHandlers: null,
        headerLeft: null,
    })
    constructor(props){
        super(props);
        this.state = {
            baseList: [],
            isLoading: true,
            refreshing: false,
            reset: false,
        }
        // this.fuckfuckChildFunc = null;
    }
    componentDidMount() {
        console.log('componentDidMount');
        this.FirebaseInit();
    }


    FirebaseInit(){
        let self = this;
        var database = firebase.database();
        database.ref('/Menu/').once('value').then(function (snapshot) {
            let Arr = self.toArrayFromObj( snapshot.val() );         
            self.setState({ baseList: Arr,isLoading: false,refreshing: false })
        });
    }

    toArrayFromObj(Arr = []){
        let arr = [];
        for (let index in Arr) {
            const element = Arr[index];
            arr.push(element)
        }
        return arr;
    }
    _onRefresh() {
        this.setState({ refreshing: true });
        this.FirebaseInit();
    }
    _onCheck(EnName){
        this.props.navigation ? this.props.navigation.navigate('ItemScreen', { name: EnName }) : this.props.nav.navigate('ItemScreen', { name: EnName })
        // this.props.navigation.navigate('ItemScreen', EnName)
        this.setState({ reset: true });
    }
    _onClickListHandle(){
        this.setState({reset: true});
    }
    render() {
        if (this.state.isLoading == true) {
            content = (
                <View style={{justifyContent: 'center',alignItems: 'center',}}>
                    <ActivityIndicator size="large" color="black" animating={this.state.isLoading}/>
                </View>
            )
        } else {
            content=(
                <ScrollView pagingEnabled
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh.bind(this)}
                        />
                    }
                >
                    <List containerStyle={{ marginTop: 0 }}>
                        {
                            this.state.baseList.map((l, i) => (
                                <ListItem
                                    roundAvatar
                                    avatar={
                                        <Avatar
                                            rounded
                                            source={{ uri: l.uri }}
                                        />
                                    }
                                    key={i}
                                    subtitle={
                                        <View style={styles.subtitleView}>
                                            <Text style={styles.titleText}>{l.ChName}</Text>
                                            <Text style={styles.ratingText}>{l.EnName}</Text>
                                        </View>
                                    }
                                    rightIcon={
                                        <View style={{flexDirection: 'row',justifyContent: 'center'}}>
                                            <BuyText Price={l.Price}
                                                onCheck={this._onCheck.bind(this,l.EnName)}
                                                resetStauts={this.state.reset}
                                            />
                                        </View>
                                    }
                                    onPress={this._onClickListHandle.bind(this)}
                                />
                            ))
                        }
                    </List>
                </ScrollView>
            )
        }


        return (
            <View style={styles.container}>
                {content}
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: backgroundColor
    },
    subtitleView: {
        flexDirection: 'column',
        paddingLeft: 20,
    },
    titleText: {
        fontSize: 18,
    },
    ratingText: {
        color: '#828795',
    }
});