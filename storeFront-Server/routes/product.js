import express from "express";
import { getAllProducts, getProductById } from "../controllers/product.js";
const router = express.Router();

router.get("/all", getAllProducts);
router.get("/:productID", getProductById);

export default router;
