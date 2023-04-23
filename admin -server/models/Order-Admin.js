import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
  {
    orderIDinCheckout: {
      type: String,
      required: true,
    },
    userID: {
      type: Object,
      required: true,
    },
    cartID: {
      type: Object,
      required: true,
      unique: true,
    },
    paymentID: {
      type: String,
      required: true,
    },
    addressID: {
      type: Object,
      required: true,
    },
    orderTotal: {
      type: Number,
      required: true,
    },
    paymentStatus: {
      type: String,
      default: "pending",
      required: true,
    },
    orderStatus: {
      type: String,
      default: "pending",
      required: true,
    },
    deliveryMethod: {
      type: String,
      default: "DHL",
      required: true,
    },
    shippingCost: {
      type: Number,
      required: true,
    },
    orderDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
