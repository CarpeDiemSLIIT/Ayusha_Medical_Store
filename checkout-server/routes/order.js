import express from "express";
import {
  createOrder,
  getOrderById,
  getOrdersByUserId,
} from "../controllers/order.js";

const router = express.Router();

// router.route("/get").get(getAddress);
router.route("/create").post(createOrder);

//get orders by user id
router.route("/get/user/").get(getOrdersByUserId);
//get order by id
router.route("/get/:id").get(getOrderById);

export default router;
