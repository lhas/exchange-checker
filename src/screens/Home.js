import React from 'react';
import {
  View,
} from 'react-native';
import { Container, Header, Content, Card, CardItem, Body, Button, Text, } from 'native-base';
import Loading from '../components/Loading';
import Exchange from '../components/Exchange';
import Error from '../components/Error';
import io from 'socket.io-client';
import axios from 'axios';

class HomeScreen extends React.Component {
  state = {
    error: false,
    loading: true,
    exchanges: [],
  };

  async componentDidMount() {
    const socket = io('https://salty-bastion-15254.herokuapp.com/');
    
    socket.on('exchanges', (exchanges) => this.setExchanges(exchanges))
    socket.on('refresh', (exchanges) => this.setExchanges(exchanges))
  }

  setExchanges(exchanges) {
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
