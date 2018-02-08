import React, { Component } from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity, Image, ScrollView, ActivityIndicator } from 'react-native';
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
        }
    }
    componentWillMount() {
        console.log('componentWillMount');
        this.FirebaseInit();
        
    }


    FirebaseInit(){
        let self = this;
        var database = firebase.database();
        database.ref('/Menu/').once('value').then(function (snapshot) {
            let Arr = self.toArrayFromObj( snapshot.val() );         
            self.setState({ baseList: Arr,isLoading: false })
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

    render() {
        if (this.state.isLoading == true) {
            content = (
                <View style={{justifyContent: 'center',alignItems: 'center',}}>
                    <ActivityIndicator size="large" color="#7DB03B" animating={this.state.isLoading}/>
                </View>
            )
        } else {
            content=(
                <ScrollView pagingEnabled>
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
                                                onPress={() => console.log(this.props.nav && this.props.navigation) }
                                            >
                                                <Text style={styles.price}>{`NT$ ${l.Price}`}</Text>
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