import bitcoinService from '../services/bitcoinService.js';
import config from '../config/config.js';

export const getHomePage = (req, res) => {
    res.render('index', {
        SERVICE_COMMISSION: config.SERVICE_COMMISSION,
        UPDATE_FREQUENCY: config.UPDATE_FREQUENCY,
    });
};

export const getBitcoinPrice = (req, res) => {
    res.json(bitcoinService.getCurrentPrice().toJSON());
};
