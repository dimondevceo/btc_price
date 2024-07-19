import { describe, it, expect } from '@jest/globals';
import Currency from '../../src/models/Currency.js';

describe('Currency', () => {
    describe('constructor', () => {
        it('should create a Currency instance with valid bid and ask', () => {
            const currency = new Currency(1.5, 1.6);
            expect(currency.bid).toBe(1.5);
            expect(currency.ask).toBe(1.6);
            expect(currency.midPrice).toBe(1.55);
        });

        it('should throw an error for negative bid', () => {
            expect(() => new Currency(-1.5, 1.6)).toThrow('Bid must be a positive number');
        });

        it('should throw an error for negative ask', () => {
            expect(() => new Currency(1.5, -1.6)).toThrow('Ask must be a positive number');
        });

        it('should throw an error for non-numeric bid', () => {
            expect(() => new Currency('1.5', 1.6)).toThrow('Bid must be a positive number');
        });

        it('should throw an error for non-numeric ask', () => {
            expect(() => new Currency(1.5, '1.6')).toThrow('Ask must be a positive number');
        });
    });

    describe('applyCommission', () => {
        it('should correctly apply commission', () => {
            const currency = new Currency(1.5, 1.6);
            currency.applyCommission(0.01);
            expect(parseFloat(currency.bid.toFixed(3))).toBe(1.485);
            expect(parseFloat(currency.ask.toFixed(3))).toBe(1.616);
            expect(parseFloat(currency.midPrice.toFixed(4))).toBe(1.5505);
        });

        it('should throw an error for negative commission', () => {
            const currency = new Currency(1.5, 1.6);
            expect(() => currency.applyCommission(-0.01)).toThrow('Commission must be a positive number');
        });

        it('should throw an error for non-numeric commission', () => {
            const currency = new Currency(1.5, 1.6);
            expect(() => currency.applyCommission('0.01')).toThrow('Commission must be a positive number');
        });
    });

    describe('toJSON', () => {
        it('should return correct JSON representation', () => {
            const currency = new Currency(1.5123, 1.6456);
            const json = currency.toJSON();
            expect(json).toEqual({
                bid: '1.51',
                ask: '1.65',
                midPrice: '1.58'
            });
        });
    });

    describe('getters', () => {
        it('should return correct values for bid, ask, and midPrice', () => {
            const currency = new Currency(1.5, 1.6);
            expect(currency.bid).toBe(1.5);
            expect(currency.ask).toBe(1.6);
            expect(currency.midPrice).toBe(1.55);
        });
    });
});
