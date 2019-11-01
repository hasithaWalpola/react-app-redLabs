import React, {Component} from 'react';
import { AppRegistry, Text, View } from 'react-native';

import Breeds from './app/components/Breeds/Breeds';

export default class myapp extends Component{
  render(){
    return(
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center"}}>
        <Breeds message= "Hi, Doggi Lovers"/>
      </View>
    );
  }
}

AppRegistry.registerComponent('myapp', () => myapp);