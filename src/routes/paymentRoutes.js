import express from 'express'
import { validatePaymentId, validateCreatePayment, validateUpdatePayment } from '../middleware/paymentValidation.js';
import { getAllPayments, getPaymentById, createPayment, updatePayment, deletePayment } from '../controllers/paymentController.js'


const router = express.Router();


router.get('/', getAllPayments)
router.get('/:id', validatePaymentId, getPaymentById)
router.post('/', validateCreatePayment, createPayment)
router.patch('/:id', validatePaymentId, validateUpdatePayment, updatePayment)
router.delete('/:id', validatePaymentId, deletePayment)

export default router;