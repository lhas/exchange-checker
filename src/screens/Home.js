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

  componentDidMount() {
    axios.get('https://api.bitvalor.com/v1/exchanges.json').then((response) => {
      const exchanges = Object.keys(response.data).map(v => {
        return response.data[v];
      });
      console.log(exchanges);

      this.setState({
        exchanges,
      });
    })
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
              Variation: 5.65%
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
