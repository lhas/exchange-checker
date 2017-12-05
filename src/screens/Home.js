import React from 'react';
import {
  View,
  Linking,
} from 'react-native';
import { Container, Header, Content, Card, CardItem, Body, Button, Text, } from 'native-base';
import Loading from '../components/Loading';
import Exchange from '../components/Exchange';
import { parseExchanges, } from '../helpers';
import { BitValorService } from '../services';

class HomeScreen extends React.Component {
  state = {
    error: false,
    loading: true,
    exchanges: [],
  };

  async componentDidMount() {
    try {
      const [ tickersResponse, exchangesResponse ] = await BitValorService.fetch();
      const exchanges = parseExchanges(exchangesResponse, tickersResponse);
    
      this.setState({
        exchanges,
        loading: false,
      });
    } catch (e) {
      this.setState({
        error: true,
        loading: false,
      });
    }
  }
  render() {
    if (this.state.loading) {
      return <Loading />;
    }

    return (
      <Container>
        <Content>
          {this.state.exchanges.map((exchange, k) => <Exchange key={exchange.id} {...exchange} />)}
        </Content>
      </Container>
    )
  }
}

export default HomeScreen;
