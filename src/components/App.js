import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  Button,
  View
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import HomeScreen from '../screens/Home';

const RootNavigator = StackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      headerTitle: 'Exchange Checker',
    },
  },
});

export default RootNavigator;
