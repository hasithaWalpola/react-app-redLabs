import React, {Component} from 'react';
import { AppRegistry, Text, View } from 'react-native';

export default class Main extends Component{
  constructor(){
    super();
    this.state ={
      name:'Hasitha'
    }
  }
  render(){
    return(
      <View>
        <Text>{this.props.message}</Text>
        <Text>Hi,{this.state.name}</Text>
      </View>
    );
  }
}

AppRegistry.registerComponent('Main', () => Main);