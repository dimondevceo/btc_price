import express from 'express';
import * as bitcoinController from '../controllers/bitcoinController.js';

const router = express.Router();

router.get('/', bitcoinController.getHomePage);
router.get('/btc/usdt', bitcoinController.getBitcoinPrice);

export default router;
