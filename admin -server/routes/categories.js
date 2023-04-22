import express from "express";
import {
  getAllCategories,
  updateCategory,
  deleteCategory,
} from "../controllers/categories.js";
import { verifyToken } from "../middleware/authAdmin.js";

const router = express.Router();

router.route("/all").get(verifyToken, getAllCategories);
router.route("/update").put(verifyToken, updateCategory);
router.route("/delete").post(verifyToken, deleteCategory);

export default router;
