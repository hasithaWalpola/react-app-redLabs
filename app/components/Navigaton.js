import React, {Component} from 'react';
import { AppRegistry, Text, View, Navigator } from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import Breeds from './Breeds';
import BreedDetails from './BreedDetails';


  const MainNavigator = createStackNavigator({
    Home: {screen: Breeds},
    Details: {screen: BreedDetails},
  });

  const myapp = createAppContainer(MainNavigator);

export default myapp;

