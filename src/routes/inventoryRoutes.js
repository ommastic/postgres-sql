import express from 'express';
import { validateInventoryId, validateCreateInventory, validateUpdateInventory } from '../middleware/inventoryValidation.js';
import { getAllInventory, getInventoryWithId, createInventory, updateInventory, deleteInventory } from '../controllers/inventoryController.js'

const router = express.Router();


router.get('/', getAllInventory);
router.get('/:warehouse_id/:product_id', validateInventoryId, getInventoryWithId);
router.post('/', validateCreateInventory, createInventory);
router.patch('/:warehouse_id/:product_id', validateInventoryId, validateUpdateInventory, updateInventory)
router.delete('/:warehouse_id/:product_id', validateInventoryId, deleteInventory)

export default router;