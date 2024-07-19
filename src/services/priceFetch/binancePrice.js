import PriceFetchInterface from './priceFetchInterface.js';

export default class BinancePriceFetcher extends PriceFetchInterface {
    constructor(ticker, to_ticker) {
        super();
        this.ticker = ticker;
        this.to_ticker = to_ticker;
    }

    async fetchPrice() {
        const response = await fetch(`https://api.binance.com/api/v3/ticker/bookTicker?symbol=${this.ticker}${this.to_ticker}`);
        const data = await response.json();
        return {
            bid: parseFloat(data.bidPrice),
            ask: parseFloat(data.askPrice)
        };
    }
}
