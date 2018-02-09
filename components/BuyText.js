import React, { Component } from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

export default class BuyText extends Component {
    constructor(props){
        super(props)
        this.state = {
            isCheck: false,
        }
    }
    _onPress(){
        this.state.isCheck ? this.callParent() : this.setState({ isCheck: !this.state.isCheck })
    }
    callParent(){
        this.setState({ isCheck: !this.state.isCheck })
        this.props.onCheck()
    }

  render() {
    return (
        <TouchableOpacity
            onPress={
                this._onPress.bind(this)
            }
        >
            <Text style={this.state.isCheck ? styles.activePrice : styles.price }>
                {
                    this.state.isCheck ? '確認購買' : `NT$ ${this.props.Price}`
                }
            </Text>
        </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
    price: {
        color: '#4F9BC4',
        alignSelf: 'center',
        borderRadius: 3,
        borderColor: '#4F9BC4',
        borderWidth: 1,
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    activePrice: {
        color: '#79D29B',
        alignSelf: 'center',
        borderRadius: 3,
        borderColor: '#79D29B',
        borderWidth: 1,
        paddingVertical: 5,
        paddingHorizontal: 10,
    }
});