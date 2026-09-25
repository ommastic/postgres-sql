import express from 'express';
import { validateShipmentId, validateCreateShipment, validateUpdateShipment } from '../middleware/shipmentValidation.js';
import { getAllShipments, getShipmentById, createShipment, updateShipment, deleteShipment } from '../controllers/shipmentController.js';

const router = express.Router();

router.get('/', getAllShipments);
router.get('/:id', validateShipmentId, getShipmentById);
router.post('/', validateCreateShipment, createShipment);
router.patch('/:id', validateShipmentId, validateUpdateShipment, updateShipment);
router.delete('/:id', validateShipmentId, deleteShipment);




export default router;