import express from 'express';
import { validateOfficeId, validateCreateOffice, validateUpdateOffice } from '../middleware/officeValidation.js';
import { getAllOffice, getOfficeById, createOffice, updateOffice, deleteOffice } from '../controllers/officeController.js'

const router = express.Router();

router.get('/', getAllOffice)
router.get('/:id', validateOfficeId, getOfficeById)
router.post('/', validateCreateOffice, createOffice)
router.patch('/:id', validateOfficeId, validateUpdateOffice, updateOffice)
router.delete('/:id', validateOfficeId, deleteOffice)



export default router;