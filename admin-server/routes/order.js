import express from "express";
import {
  getOrdersByStatus,
  changeOrderStatus,
  getAllOrders,
} from "../controllers/order.js";

const router = express.Router();
//get orders by status
router.route("/get/all").get(getAllOrders);
router.route("/get/:status").get(getOrdersByStatus);
// change order status
router.route("/change/:id").put(changeOrderStatus);

export default router;
