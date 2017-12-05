import React from 'react';
import {
  View,
} from 'react-native';
import { Spinner, } from 'native-base';

const Error = () => (
  <View style={{ flex: 1, 
    justifyContent: 'center',
    alignItems: 'center' }}>
    Error not expected while fetching the data
  </View>
);

export default Error;
