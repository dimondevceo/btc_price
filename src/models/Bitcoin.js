class Bitcoin {
    constructor(bid, ask) {
        this._validatePositiveNumber(bid, 'Bid');
        this._validatePositiveNumber(ask, 'Ask');
        this._bid = bid;
        this._ask = ask;
        this._calculateMidPrice();
    }

    get bid() {
        return this._bid;
    }

    get ask() {
        return this._ask;
    }

    get midPrice() {
        return this._midPrice;
    }

    applyCommission(commission) {
        this._validatePositiveNumber(commission, 'Commission');
        this._bid *= (1 - commission);
        this._ask *= (1 + commission);
        this._calculateMidPrice();
    }

    toJSON() {
        return {
            bid: this._bid.toFixed(2),
            ask: this._ask.toFixed(2),
            midPrice: this._midPrice.toFixed(2),
        };
    }

    _calculateMidPrice() {
        this._midPrice = (this._bid + this._ask) / 2;
    }

    _validatePositiveNumber(value, name) {
        if (typeof value !== 'number' || isNaN(value) || value < 0) {
            throw new Error(`${name} must be a positive number`);
        }
    }
}

export default Bitcoin;
