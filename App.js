import * as React from 'react';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Breeds, BreedDetails } from './app/components';
import { APP_CONFIG } from "./app/configs";
import { toSentenceCase } from "./app/utils";

const RootStack = createStackNavigator(
  {
    Home: {
        screen: Breeds,
        path: "breeds",
        navigationOptions: ({ navigation }) => ({
            title: APP_CONFIG.APP_NAME,
        }),
    },
    Details: {
        screen: BreedDetails,
        path: "breed-details",
        navigationOptions: ({ navigation }) => ({
            title: toSentenceCase(navigation.state.params.item.name),
        }),
    },
  },
  {
    initialRouteName: "Home",
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
