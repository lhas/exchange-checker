import React from 'react';
import {
  View,
  Linking,
} from 'react-native';
import { Container, Header, Content, Card, CardItem, Body, Button, Text } from 'native-base';
import axios from 'axios';

class HomeScreen extends React.Component {
  state = {
    exchanges: [],
  };

  async componentDidMount() {
    const requestTickers = axios.get('https://api.bitvalor.com/v1/ticker.json');
    const requestExchanges = axios.get('https://api.bitvalor.com/v1/exchanges.json');

    const [ tickersResponse, exchangesResponse ] = await Promise.all([
      requestTickers,
      requestExchanges
    ]);

    const exchanges = Object.keys(exchangesResponse.data)
    .map(exchange => ({
      id: exchange,
      ...exchangesResponse.data[exchange],
    }))
    .map(exchange => ({
        ...exchange,
        tickers: tickersResponse.data.ticker_24h.exchanges[exchange.id],
    }))
    .map(exchange => ({
      ...exchange,
      variation: !!exchange.tickers ? (((exchange.tickers.last / exchange.tickers.open) - 1) * 100).toFixed(2) : 0,
    }))
    .filter(exchange => exchange.variation > 0);
  
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
            <Text style={{flex: 1 }}>
              Volume: 0.015
            </Text>
          </CardItem>
          <CardItem style={{flex: 1, flexDirection: 'row' }}>
            <Text style={{flex: 1 }}>
              Actual Price: R$2.35
            </Text>
            <Text style={{flex: 1 }}>
              Variation: {exchange.variation}
            </Text>
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
