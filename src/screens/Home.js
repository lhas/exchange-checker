import React from 'react';
import {
  View
} from 'react-native';
import { Container, Header, Content, Card, CardItem, Body, Text } from 'native-base';
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
          <CardItem>
            <Body>
              <Text style={{ color: `#${exchange.color}` }}>
                {exchange.name}
                {exchange.url}
                {exchange.url_book}
              </Text>
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
