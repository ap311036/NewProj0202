import React, { Component } from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity, Image, ScrollView, ActivityIndicator, RefreshControl } from 'react-native';
import { List, ListItem, Avatar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
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
            iconFlag: false,
        }
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
                                            <TouchableOpacity
                                                onPress={
                                                    () => {this.props.navigation ? this.props.navigation.navigate('Main') : this.props.nav.navigate('Main')
                                                        this.setState({iconFlag: !this.state.iconFlag})
                                                        }
                                                    }
                                            >
                                                
                                                <Text style={styles.price}>
                                                    {this.state.iconFlag ? '確認購買' : `NT$ ${l.Price}`}
                                                    
                                                </Text>
                                                {/* <Icon
                                                    name={'plus'}
                                                    size={20}
                                                    onPress={() => console.log('Pressed !')}
                                                /> */}
                                            </TouchableOpacity>
                                        </View>
                                    }
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
    },
    price: {
        color: '#828795',
        alignSelf: 'center',
        borderRadius: 3,
        borderColor: '#4F9BC4',
        color: '#4F9BC4',
        borderWidth: 1,
        paddingVertical: 5,
        paddingHorizontal: 10,
    }
});