import express from 'express';
import { orderTransactions } from '../transactions/orderTransaction.js';

const router = express.Router();

router.post('/orders', orderTransactions)

export default router;