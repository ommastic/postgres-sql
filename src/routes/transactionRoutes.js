import express from 'express';
import { validateCreateOrderTransaction } from '../middleware/orderTransactionValidation.js';
import { orderTransactions } from '../transactions/orderTransaction.js';

const router = express.Router();

router.post('/orders', validateCreateOrderTransaction, orderTransactions)

export default router;