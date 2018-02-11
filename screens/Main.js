import React, { Component } from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity, ScrollView, Image, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Menu from './Menu';
const backgroundColor = '#D4D47D';
const imageStyle = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width / 2,
};
const ImgArry = [
    require('../assets/images/Banner/0915banner-2-1-940x400-940x400_c.jpg'),
    require('../assets/images/Banner/BANNER-CC-940x400-940x400_c.jpg'),
    require('../assets/images/Banner/Banner2-940x400_c.jpg'),
    require('../assets/images/Banner/Milk-BANNER-940x400_c.jpg')
]
let myvar;
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
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 0
        }
    }
    componentDidMount(){
        myvar = setTimeout(this.autoAni, 2000);
    }
    componentWillUpdate() {
        clearTimeout(myvar);
    }
    componentDidUpdate() {
        myvar = setTimeout(this.autoAni, 2000);
    }
    onAnimationEnd(e) {
        let offSetX = e.nativeEvent.contentOffset.x;
        let currentPage = offSetX / imageStyle.width;
        this.setState({ currentPage: parseInt(currentPage)});
    }

    autoAni = () => {
        let currentPage = this.state.currentPage;
        let nextPage = ++currentPage;
        if (currentPage >= ImgArry.length){
            nextPage = 0;
        }
        this.ScrollView.scrollTo({ x: imageStyle.width * nextPage, y: 0, animated: true })
    };


    _renderHorizontalScrollView = () => {
        let self = this;
        
        renderPagingIndicator =() => {
            let itemAry = [], autoColor;
            for (let i = 0; i < ImgArry.length; i++) {
                let item = ImgArry[i];
                autoColor = (this.state.currentPage === i) ? { color: 'gray' } : { color: 'white' }
                itemAry.push(
                    <Text key={i} style={[{ fontSize: 30 }, autoColor]}>•</Text>
                )
            }
            return itemAry;
        }
        renderItem = () => {
            let itemArry=[]
            for(let i = 0; i < ImgArry.length ; i++ ){
                itemArry.push(
                    <TouchableOpacity
                        key={i}
                        activeOpacity={1}
                        onPressIn={() => clearTimeout(myvar) }
                        onPressOut={() => myvar = setTimeout(this.autoAni, 2000) }
                    >
                        <Image
                            source={ImgArry[i]}
                            style={imageStyle}
                            resizeMode="cover" 
                        />
                    </TouchableOpacity>
                )
            }
            return itemArry;
        }
        return (
            <View>
                <ScrollView pagingEnabled
                            directionalLockEnabled
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            style={{flexGrow:0,}}
                            onMomentumScrollEnd={ this.onAnimationEnd.bind(this) }
                            ref={ScrollView => this.ScrollView = ScrollView}
                >
                    {renderItem()}
                </ScrollView>
                <View style={styles.pagingIndicatorStyle}>
                    {renderPagingIndicator()}
                </View>
            </View>
        );
    };
    render() {
        return (
            <View style={styles.container}>
                    {this._renderHorizontalScrollView()}
                    {/* <Menu nav={this.props.navigation}></Menu> */}
                    <Text
                        onPress={()=> this.props.navigation.navigate('Menu')}
                    >GO to Menu</Text>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: backgroundColor,
    },
    Subcontainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'pink'
    },
    pagingIndicatorStyle: {
        backgroundColor: 'rgba(255,255,255,0)',
        width: imageStyle.width,
        flexDirection: 'row',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 0
    }
});