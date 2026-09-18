import express from "express";
import {
  getAllProducts,
  searchProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import {
  validateProductId,
  validateProductBody,
  validateUpdateProduct,
} from "../middleware/productValidation.js";

const router = express.Router();

router.get("/", getAllProducts);
router.get("/search", searchProducts);
router.get("/:id", validateProductId, getProductById);
router.post("/", validateProductBody, createProduct);
router.patch("/:id", validateProductId, validateUpdateProduct, updateProduct);
router.delete("/:id", validateProductId, deleteProduct);

export default router;
