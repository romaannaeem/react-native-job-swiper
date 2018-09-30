import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';

import store from './store';
import AuthScreen from './screens/AuthScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import MapScreen from './screens/MapScreen';
import DeckScreen from './screens/DeckScreen';
import SettingsScreen from './screens/SettingsScreen';
import ReviewScreen from './screens/ReviewScreen';

export default class App extends React.Component {
  render() {
    
      const MainNavigator = TabNavigator({ // New instance of TabNavigator
        welcome: { screen: WelcomeScreen }, // New possible route "welcome"
        auth: { screen: AuthScreen },
        main: {
          screen: TabNavigator({ // Nested tabs
            map: { screen: MapScreen },
            deck: { screen: DeckScreen },
            review: {
              screen: StackNavigator({ // More nested tabs
                review: { screen: ReviewScreen },
                settings: { screen: SettingsScreen }
              })
            }
          },
          {
            tabBarPosition: 'bottom', // Places tab bar at bottom (Android defaults to top)
            lazy: true,
            swipeEnabled: false
          },{
            tabBarOptions: {
              labelStyle: { fontSize: 12 }
            }
          })
        },
      },
      {
        navigationOptions: {
          tabBarVisible: false
        },
        tabBarPosition: 'bottom', // Places tab bar at bottom (Android defaults to top)
        swipeEnabled: false, // Disables swipes on the given navigator
        lazy: true,  // Allows tabNav to wait until screen is displayed to render it
        animationEnabled: false, // Disables sliding animation between screens
      });

    return (
      // Every component in application will have access to the store with help from connect function
      <Provider store={store}> 
        <View style={styles.container}>
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
