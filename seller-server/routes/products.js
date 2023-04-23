import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getCategories,
  getCategoriesById,
} from "../controllers/products.js";
import { verifyToken } from "../middleware/auth.js";
import bodyParser from "body-parser";
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

const router = express.Router();

//get categories
router.get("/categories", getCategories);

router.get("/categories/:id", getCategoriesById);

//create product

//get products

router.get("/all/:id", verifyToken, getAllProducts);

//get product by id

router.get("/:id", verifyToken, getProductById);

//update product

//router.put("/update/:id", verifyToken, updateProduct);

//delete product

router.delete("/delete/:id", verifyToken, deleteProduct);

export default router;
