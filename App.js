import * as React from 'react';
import { AppRegistry, Text, View } from 'react-native';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Breeds from './app/components/Breeds';
import BreedDetails from './app/components/BreedDetails';


const RootStack = createStackNavigator(
  {
    Home: Breeds,
    Details: BreedDetails,
  },
  {
    initialRouteName: 'Home',
  }
);

const AppContainer = createAppContainer(RootStack);
// AppRegistry.registerComponent('App', () => RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}



// import React, {Component} from 'react';
// import { AppRegistry, Text, View,} from 'react-native';

// import {createAppContainer} from 'react-navigation';
// import {createStackNavigator} from 'react-navigation-stack';

// import Breeds from './app/components/Breeds';
// import BreedDetails from './app/components/BreedDetails';


//   const MainNavigator = createStackNavigator({
//     Home: Breeds,
//     Details: BreedDetails,
//   });

//  // const myapp = createAppContainer(MainNavigator);

// export default class myapp extends Component{

//   render(){
//     return(
//       <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//         <MainNavigator/>
//       </View>
//     );
//   }
// }

// //export default myapp
// // createAppContainer(MainNavigator);
