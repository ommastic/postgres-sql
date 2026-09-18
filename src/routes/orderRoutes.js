import express from "express";
import {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
} from "../controllers/orderController.js";
import {
  validateOrderId,
  validateCreateOrder,
  validateUpdateOrder,
} from "../middleware/orderValidation.js";

const router = express.Router();

router.get("/", getAllOrders);
router.get("/:id", validateOrderId, getOrderById);
router.post("/", validateCreateOrder, createOrder);
router.patch("/:id", validateOrderId, validateUpdateOrder, updateOrder);
router.delete("/:id", validateOrderId, deleteOrder);

export default router;
