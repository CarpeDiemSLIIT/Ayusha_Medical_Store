import express from "express";
import {
  getCart,
  addNewProduct,
  deleteItem,
  changeQuantity,
} from "../controllers/cart.js";

const router = express.Router();

router.route("/get").get(getCart);
router.route("/add").post(addNewProduct);
router.route("/delete-item/:cartItemId").delete(deleteItem);
router.route("/changeQuantity").put(changeQuantity);

export default router;
