import calculateVariation from './calculate-variation';

const parseExchanges = (exchangesResponse, tickersResponse) => Object.keys(exchangesResponse.data)
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
  variation: !!exchange.tickers ? calculateVariation(exchange.tickers) : 0,
}))
.filter(exchange => exchange.variation > 0);

export default parseExchanges;
