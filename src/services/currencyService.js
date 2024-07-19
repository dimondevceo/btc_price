import config from '../config/config.js';
import CurrencyFactory from './currencyFactory.js';

export default class CurrencyService {
    constructor(priceFetcher, currencyType) {
        this.priceFetcher = priceFetcher;
        this.currencyType = currencyType;
        this.currentPrice = null;
    }

    async fetchPrice() {
        try {
            const { bid, ask } = await this.priceFetcher.fetchPrice();
            this.currentPrice = CurrencyFactory.createCurrency(this.currencyType, bid, ask);
            this.currentPrice.applyCommission(config.SERVICE_COMMISSION);
            console.log(`${this.currencyType} price:`, this.currentPrice.toJSON());
            return this.currentPrice;
        } catch (error) {
            console.error(`Error fetching ${this.currencyType} price:`, error.message);
            throw error;
        }
    }

    getCurrentPrice() {
        if (!this.currentPrice) {
            throw new Error(`${this.currencyType} price has not been fetched yet`);
        }
        return this.currentPrice;
    }
}