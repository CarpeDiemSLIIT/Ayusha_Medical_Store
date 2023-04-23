import Client from "../models/Client.js";
import { Cart } from "../models/Cart.js";
import Order from "../models/Order.js";
import axios from "axios";
import { sendOrder } from "../queues/rabbitMQ.js";

export const createOrder = async (req, res) => {
  try {
    const {
      cartID,
      paymentID,
      addressID,
      orderTotal,
      paymentStatus,
      deliveryMethod,
      shippingCost,
    } = req.body;

    if (
      !cartID ||
      !paymentID ||
      !addressID ||
      !orderTotal ||
      !paymentStatus ||
      !deliveryMethod ||
      !shippingCost
    )
      throw new Error("Please Provide all fields");

    const newOrder = new Order({
      userID: req.user.id,
      cartID,
      paymentID,
      addressID,
      orderTotal,
      paymentStatus,
      deliveryMethod,
      shippingCost,
    });
    await newOrder.save();

    await Cart.findByIdAndUpdate(cartID, { status: "ordered" });

    // send the order to the message queue
    const orderWithALlData = await Order.findById(newOrder.id)
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

    // console.log(orderWithALlData);
    sendOrder(orderWithALlData);

    // don't wait for this to complete
    axios.post("http://localhost:4901/api/send-sms-email", {
      fullName: req.user.firstName + " " + req.user.lastName,
      orderId: newOrder._id,
      orderTotal: newOrder.orderTotal,
      email: req.user.email,
      phoneNumber: req.user.phoneNumber,
    });
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      userID: req.user.id,
    })
      .populate("cartID")
      .populate("addressID");
    res.status(200).json(order);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getOrdersByUserId = async (req, res) => {
  try {
    const orders = await Order.find({ userID: req.user.id })
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
    res.status(404).json({ message: error.message });
  }
};

// message queue
export const changeOrderStatus = async (data) => {
  try {
    const order = await Order.findById(data.orderID);
    order.orderStatus = data.status;
    await order.save();
  } catch (error) {
    console.log(error);
  }
};
