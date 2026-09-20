import express from 'express';
import { validateCategoryId, validateCreateCategory, validateUpdateCategory } from '../middleware/categoryValidation.js';
import { getAllCategories, getCategoryWithId, createCategory, updateCategory, deleteCategory } from '../controllers/categoryController.js'

const router = express.Router();

router.get('/', getAllCategories);
router.get('/:id', validateCategoryId, getCategoryWithId)
router.post('/', validateCreateCategory, createCategory )
router.patch('/:id', validateCategoryId, validateUpdateCategory, updateCategory)
router.delete('/:id', validateCategoryId, deleteCategory)


export default router;