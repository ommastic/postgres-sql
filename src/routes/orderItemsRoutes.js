import express from 'express';
import { validateOrderItemIds, validateCreateOrderItem, validateUpdateOrderItem } from '../middleware/orderItemsValidation.js';
import { getAllOrderItems, getOrderItemWithOrderIdAndProductId, createOrderItem, updateOrderItem, deleteOrderItem } from '../controllers/orderItemController.js'


const router = express.Router();

router.get('/', getAllOrderItems);
router.get('/:orderId/:productId', validateOrderItemIds, getOrderItemWithOrderIdAndProductId);
router.post('/', validateCreateOrderItem, createOrderItem);
router.patch('/:orderId/:productId', validateOrderItemIds, validateUpdateOrderItem, updateOrderItem);
router.delete('/:orderId/:productId', validateOrderItemIds, deleteOrderItem);

export default router;