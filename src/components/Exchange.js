import React from 'react';
import {
  View,
  Linking,
} from 'react-native';
import { Container, Header, Content, Card, CardItem, Body, Button, Text, Spinner, } from 'native-base';
import { colorsScale, } from '../helpers';

const Exchange = ({ id, name, tickers, variation, url_book, color}) => (
  <Card>
  <CardItem header>
    <Text style={{flex: 1 }}>
      {name}
    </Text>
  </CardItem>
  <CardItem>
    <View>
      <Text style={{ fontWeight: 'bold', }}>
        Volume:{' '}
      </Text>
      <Text style={{ color: '#FF9800' }}>
      {Math.ceil(tickers.vol).toFixed(2)} BTC
      </Text>
    </View>
  </CardItem>
  <CardItem>
    <View>
      <Text style={{ fontWeight: 'bold', }}>
        Current Price:{' '}
      </Text>
      <Text style={{ color: 'green' }}>
        R$ {tickers.last.toFixed(2)}
      </Text>
    </View>
  </CardItem>
  <CardItem>
    <View>
      <Text style={{ fontWeight: 'bold', }}>
        Variation:{' '}
      </Text>
      <Text style={{ color: colorsScale(variation) }}>
        {variation}%
      </Text>
    </View>
  </CardItem>
  <CardItem>
    <Body>
      <Button style={{ backgroundColor: `#${color}` }} onPress={()=> Linking.openURL(url_book)}>
        <Text>Trade Now!</Text>
      </Button>
    </Body>
  </CardItem>
  </Card>
);

export default Exchange;
