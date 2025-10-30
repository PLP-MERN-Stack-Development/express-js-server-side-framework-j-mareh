import express from "express";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductStats,
} from "../controllers/productController.js";
import auth from "../middleware/auth.js";
import validateProduct from "../middleware/validateProduct.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/stats", getProductStats);
router.get("/:id", getProductById);
router.post("/", auth, validateProduct, createProduct);
router.put("/:id", auth, validateProduct, updateProduct);
router.delete("/:id", auth, deleteProduct);

export default router;
