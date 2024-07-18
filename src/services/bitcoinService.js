import Bitcoin from '../models/Bitcoin.js';
import config from '../config/config.js';

class BitcoinService {
    constructor() {
        this.currentPrice = new Bitcoin(0, 0);
    }

    async fetchBitcoinPrice() {
        try {
            const response = await fetch('https://api.binance.com/api/v3/ticker/bookTicker?symbol=BTCUSDT');
            const data = await response.json();
            const bid = parseFloat(data.bidPrice);
            const ask = parseFloat(data.askPrice);

            this.currentPrice = new Bitcoin(bid, ask);
            this.currentPrice.applyCommission(config.SERVICE_COMMISSION);

            console.log('Bitcoin price:', this.currentPrice.toJSON());
            return this.currentPrice;
        } catch (error) {
            console.error('Error fetching Bitcoin price:', error.message);
            throw error;
        }
    }

    getCurrentPrice() {
        return this.currentPrice;
    }
}

export default new BitcoinService();
