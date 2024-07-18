import { describe, it, expect } from '@jest/globals';
import Bitcoin from '../../src/models/Bitcoin.js';

describe('Bitcoin', () => {
    describe('constructor', () => {
        it('should create a Bitcoin instance with valid bid and ask', () => {
            const bitcoin = new Bitcoin(30000, 30100);
            expect(bitcoin.bid).toBe(30000);
            expect(bitcoin.ask).toBe(30100);
            expect(bitcoin.midPrice).toBe(30050);
        });

        it('should throw an error for negative bid', () => {
            expect(() => new Bitcoin(-30000, 30100)).toThrow('Bid must be a positive number');
        });

        it('should throw an error for negative ask', () => {
            expect(() => new Bitcoin(30000, -30100)).toThrow('Ask must be a positive number');
        });

        it('should throw an error for non-numeric bid', () => {
            expect(() => new Bitcoin('30000', 30100)).toThrow('Bid must be a positive number');
        });

        it('should throw an error for non-numeric ask', () => {
            expect(() => new Bitcoin(30000, '30100')).toThrow('Ask must be a positive number');
        });
    });

    describe('applyCommission', () => {
        it('should correctly apply commission', () => {
            const bitcoin = new Bitcoin(30000, 30100);
            bitcoin.applyCommission(0.01);
            expect(bitcoin.bid).toBe(29700);
            expect(bitcoin.ask).toBe(30401);
            expect(bitcoin.midPrice).toBe(30050.5);
        });

        it('should throw an error for negative commission', () => {
            const bitcoin = new Bitcoin(30000, 30100);
            expect(() => bitcoin.applyCommission(-0.01)).toThrow('Commission must be a positive number');
        });

        it('should throw an error for non-numeric commission', () => {
            const bitcoin = new Bitcoin(30000, 30100);
            expect(() => bitcoin.applyCommission('0.01')).toThrow('Commission must be a positive number');
        });
    });

    describe('toJSON', () => {
        it('should return correct JSON representation', () => {
            const bitcoin = new Bitcoin(30000.123, 30100.456);
            const json = bitcoin.toJSON();
            expect(json).toEqual({
                bid: '30000.12',
                ask: '30100.46',
                midPrice: '30050.29'
            });
        });
    });

    describe('getters', () => {
        it('should return correct values for bid, ask, and midPrice', () => {
            const bitcoin = new Bitcoin(30000, 30100);
            expect(bitcoin.bid).toBe(30000);
            expect(bitcoin.ask).toBe(30100);
            expect(bitcoin.midPrice).toBe(30050);
        });
    });
});
