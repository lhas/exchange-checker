import React from 'react';
import {
  View,
} from 'react-native';
import { Container, Header, Content, Card, CardItem, Body, Button, Text, } from 'native-base';
import Loading from '../components/Loading';
import Exchange from '../components/Exchange';
import Error from '../components/Error';
import { parseExchanges, } from '../helpers';
import { BitValorService } from '../services';

const MINUTE_IN_SECONDS = 1000;
const SECONDS_TO_REFRESH = 30;

class HomeScreen extends React.Component {
  state = {
    error: false,
    loading: true,
    exchanges: [],
  };

  async componentDidMount() {
    try {
      await this.fetch();

      setInterval(() => {
        this.fetch()
      }, SECONDS_TO_REFRESH * MINUTE_IN_SECONDS);
    } catch (e) {
      this.setState({
        error: true,
        loading: false,
      });
    }
  }

  async fetch() {
    await this.setState({
      loading: true,
    });
    const [ tickersResponse, exchangesResponse ] = await BitValorService.fetch();
    const exchanges = parseExchanges(exchangesResponse, tickersResponse);
  
    this.setState({
      exchanges,
      loading: false,
    });
  }

  render() {
    if (this.state.error) {
      return <Error />;
    }

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
