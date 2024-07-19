import Bitcoin from '../models/Bitcoin.js';

export default class CurrencyFactory {
    static createCurrency(type, bid, ask) {
        switch(type.toLowerCase()) {
            case 'bitcoin':
                return new Bitcoin(bid, ask);
            default:
                throw new Error(`Unsupported currency type: ${type}`);
        }
    }
}
