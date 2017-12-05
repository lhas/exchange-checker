import React from 'react';
import {
  View,
  Linking,
} from 'react-native';
import { Container, Header, Content, Card, CardItem, Body, Button, Text } from 'native-base';
import { parseExchanges } from '../helpers';
import { BitValorService } from '../services';

class HomeScreen extends React.Component {
  state = {
    exchanges: [],
  };

  async componentDidMount() {
    const [ tickersResponse, exchangesResponse ] = await BitValorService.fetch();
    const exchanges = parseExchanges(exchangesResponse, tickersResponse);
  
    this.setState({
      exchanges,
    });
  }
  render() {
    return (
      <Container>
        <Content>
          {this.state.exchanges.map((exchange, k) => (
          <Card key={k}>
          <CardItem style={{flex: 1, flexDirection: 'row' }} header>
            <Text style={{flex: 1 }}>
              {exchange.name}
            </Text>
          </CardItem>
          <CardItem style={{flex: 1, flexDirection: 'row' }}>
            <Text style={{flex: 1 }}>
              Volume: {Math.ceil(exchange.tickers.vol).toFixed(2)} BTC
            </Text>
          </CardItem>
          <CardItem style={{flex: 1, flexDirection: 'row' }}>
            <View style={{flex: 1, flexDirection: 'row' }}>
              <Text style={{ fontWeight: 'bold', }}>
                Actual Price:{' '}
              </Text>
              <Text style={{ color: exchange.variation > 0 ? 'green' : 'red' }}>
                R$ {exchange.tickers.last.toFixed(2)}
              </Text>
            </View>
          </CardItem>
          <CardItem style={{flex: 1, flexDirection: 'row' }}>
            <View style={{flex: 1, flexDirection: 'row' }}>
              <Text style={{ fontWeight: 'bold', }}>
                Variation:{' '}
              </Text>
              <Text style={{ color: exchange.variation > 0 ? 'green' : 'red' }}>
                {exchange.variation}%
              </Text>
            </View>
          </CardItem>
          <CardItem>
            <Body>
              <Button style={{ backgroundColor: `#${exchange.color}` }} onPress={()=> Linking.openURL(exchange.url_book)}>
                <Text>Trade Now</Text>
              </Button>
            </Body>
          </CardItem>
          </Card>
          ))}
        </Content>
      </Container>
    )
  }
}

export default HomeScreen;
