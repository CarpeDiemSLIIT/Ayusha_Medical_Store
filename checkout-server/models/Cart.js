import mongoose from "mongoose";

const cartItemSchema = mongoose.Schema({
  productID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  quantity: {
    type: Number,
    required: true,
  },
  priceForRow: {
    type: Number,
    required: true,
  },
});

const cartSchema = mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  cartItems: [cartItemSchema],
  total: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    default: "current",
  },
});

const CartItem = mongoose.model("CartItem", cartItemSchema);
const Cart = mongoose.model("Cart", cartSchema);

export { CartItem, Cart };
