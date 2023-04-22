import Order from "../models/Order.js";
import { CartItem, Cart } from "../models/Cart.js";
import Address from "../models/Address.js";
import Product from "../models/Product.js";
import Client from "../models/Client.js";
//PATH : /api/admin/order/:status

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("cartID")
      .populate("addressID")
      .populate("userID")
      .populate({
        path: "cartID",
        populate: {
          path: "cartItems.productID",
          model: "Product",
        },
      });
    res.status(200).json(orders);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getOrdersByStatus = async (req, res) => {
  try {
    const orders = await Order.find({ orderStatus: req.params.status })
      .populate("cartID")
      .populate("addressID")
      .populate({
        path: "cartID",
        populate: {
          path: "cartItems.productID",
          model: "Product",
        },
      });
    res.status(200).json(orders);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const changeOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    order.orderStatus = req.body.status;
    await order.save();
    res.status(200).json(order);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
