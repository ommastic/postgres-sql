import express from "express";
import {
  getAllProducts,
  searchProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import validateProductId from "../middleware/validateProductId.js";
import validateUpdateProduct from "../middleware/validateUpdateProduct.js";
import validateProductBody from "../middleware/validateCreateProduct.js";


const router = express.Router();

router.get("/", getAllProducts);
router.get("/search", searchProducts);
router.get("/:id",  validateProductId, getProductById);
router.post("/", validateProductBody, createProduct);
router.patch("/:id", validateProductId, validateUpdateProduct, updateProduct);
router.delete("/:id",validateProductId, deleteProduct);

export default router;
