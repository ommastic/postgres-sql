import express from 'express';
import { validateWarehouseId, validateCreateWarehouse, validateUpdateWarehouse } from '../middleware/warehouseValidation.js';
import { getAllWarehouses, getWarehouseById, createWarehouse, updateWarehouse, deleteWarehouse } from '../controllers/warehouseController.js'

const router = express.Router();

router.get('/', getAllWarehouses);
router.get('/:id', validateWarehouseId, getWarehouseById);
router.post('/', validateCreateWarehouse, createWarehouse);
router.patch('/:id', validateWarehouseId, validateUpdateWarehouse, updateWarehouse);
router.delete('/:id', validateWarehouseId, deleteWarehouse);

export default router;