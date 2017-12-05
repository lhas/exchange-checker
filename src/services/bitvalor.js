import axios from 'axios';

class BitValorService {
  async fetch() {
    const requestTickers = axios.get('https://api.bitvalor.com/v1/ticker.json');
    const requestExchanges = axios.get('https://api.bitvalor.com/v1/exchanges.json');

    return await Promise.all([
      requestTickers,
      requestExchanges
    ]);
  }
}

export default new BitValorService();
