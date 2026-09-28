import express from 'express';
import { validateEmployeeId, validateCreateEmployee, validateUpdateEmployee } from '../middleware/employeeValidation.js';
import { getAllEmployees, getEmployeeById, createEmployee, updateEmployee, deleteEmployee } from '../controllers/employeeController.js'

const router = express.Router();

router.get('/', getAllEmployees)
router.get('/:id', validateEmployeeId, getEmployeeById)
router.post('/', validateCreateEmployee, createEmployee)
router.patch('/:id', validateEmployeeId, validateUpdateEmployee, updateEmployee)
router.delete('/:id', validateEmployeeId, deleteEmployee)



export default router;