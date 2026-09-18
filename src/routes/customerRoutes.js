import express from "express";
import {
  getAllCustomers,
  searchCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from "../controllers/customerController.js";
import {
  validateCustomerId,
  validateCreateCustomer,
  validateUpdateCustomer,
} from "../middleware/customerValidation.js";

const router = express.Router();

router.get("/", getAllCustomers);
router.get("/search", searchCustomers);
router.get("/:id", validateCustomerId, getCustomerById);
router.post("/", validateCreateCustomer, createCustomer);
router.patch(
  "/:id",
  validateCustomerId,
  validateUpdateCustomer,
  updateCustomer,
);
router.delete("/:id", validateCustomerId, deleteCustomer);

export default router;
