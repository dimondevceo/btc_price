import BinancePriceFetcher from '../services/priceFetch/binancePrice.js';
import CurrencyService from '../services/currencyService.js';
import config from '../config/config.js';

const bitcoinPriceFetcher = new BinancePriceFetcher('BTC', 'USDT');
const bitcoinService = new CurrencyService(bitcoinPriceFetcher, 'Bitcoin');

export const getHomePage = (req, res) => {
    res.render('index', {
        SERVICE_COMMISSION: config.SERVICE_COMMISSION,
        UPDATE_FREQUENCY: config.UPDATE_FREQUENCY,
    });
};

export const fetchBitcoinPrice = (req, res) => {
    bitcoinService.fetchPrice();
};

export const getBitcoinPrice = (req, res) => {
    res.json(bitcoinService.getCurrentPrice().toJSON());
};
