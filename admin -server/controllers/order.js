import Order from "../models/Order-Admin.js";
// import { CartItem, Cart } from "../models/Cart.js";
// import Address from "../models/Address.js";
// import Product from "../models/Product.js";
// import Client from "../models/old/Client.js";
//PATH : /api/admin/order/:status
import { sendStatusChange } from "../queues/rabbitMQ.js";

//TODO
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    // .populate("cartID")
    // .populate("addressID")
    // .populate("userID")
    // .populate({
    //   path: "cartID",
    //   populate: {
    //     path: "cartItems.productID",
    //     model: "Product",
    //   },
    // });
    res.status(200).json(orders);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

//TODO
export const getOrdersByStatus = async (req, res) => {
  try {
    const orders = await Order.find({ orderStatus: req.params.status });
    // .populate("cartID")
    // .populate("addressID")
    // .populate({
    //   path: "cartID",
    //   populate: {
    //     path: "cartItems.productID",
    //     model: "Product",
    //   },
    // });
    res.status(200).json(orders);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

//TODO
export const changeOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    order.orderStatus = req.body.status;
    await order.save();
    // send the change to the checkout-server
    sendStatusChange({
      orderID: order.orderIDinCheckout,
      status: req.body.status,
    });
    res.status(200).json(order);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// controller for message queue
export const createOrder = async (data) => {
  console.log("createOrder", data);

  try {
    const newOrder = new Order({
      orderIDinCheckout: data._id,
      userID: data.userID,
      cartID: data.cartID,
      paymentID: data.paymentID,
      addressID: data.addressID,
      orderTotal: data.orderTotal,
      paymentStatus: data.paymentStatus,
      deliveryMethod: data.deliveryMethod,
      shippingCost: data.shippingCost,
    });
    await newOrder.save();
  } catch (error) {
    console.log(error);
  }
};
