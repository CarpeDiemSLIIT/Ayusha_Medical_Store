import { CartItem, Cart } from "../models/Cart.js";
import Product from "../models/Product.js";

export const getCart = async (req, res) => {
  try {
    const cart = await Cart.find({
      userID: req.user.id,
      status: "current",
    }).populate("cartItems.productID");
    res.status(200).json(cart);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const addNewProduct = async (req, res) => {
  try {
    const { productID, quantity } = req.body;
    const cart = await Cart.findOne({ userID: req.user.id, status: "current" });
    const product = await Product.findById(productID);
    const priceForRow = product.listingPrice * quantity;

    if (!cart) {
      const cartItem = new CartItem({
        productID,
        quantity,
        priceForRow,
      });
      await cartItem.save();
      const newCart = new Cart({
        userID: req.user.id,
        cartItems: [cartItem],
        total: priceForRow,
      });
      await newCart.save();
      const updatedCart = await Cart.find({ userID: req.user.id }).populate(
        "cartItems.productID"
      );
      res.status(201).json(updatedCart);
    } else {
      const cartItem = new CartItem({
        productID,
        quantity,
        priceForRow,
      });
      await cartItem.save();
      cart.cartItems.push(cartItem);
      cart.total += priceForRow;
      await cart.save();
      const updatedCart = await Cart.find({
        userID: req.user.id,
        status: "current",
      }).populate("cartItems.productID");
      res.status(201).json(updatedCart);
    }
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const deleteItem = async (req, res) => {
  try {
    const { cartItemId } = req.params;
    console.log(cartItemId);
    const cart = await Cart.findOne({ userID: req.user.id, status: "current" });
    if (!cart) {
      throw new Error("Cart not found");
    }
    const cartItem = await CartItem.findById(cartItemId);
    if (!cartItem) {
      throw new Error("Cart Item not found");
    }
    cart.cartItems = cart.cartItems.filter((cartItem) => {
      if (cartItem._id.toString() === cartItemId) {
        cart.total = (cart.total - cartItem.priceForRow).toFixed(2);
      }
      return cartItem._id.toString() !== cartItemId;
    });
    await cart.save();
    const updatedCart = await Cart.find({
      userID: req.user.id,
      status: "current",
    }).populate("cartItems.productID");
    res.status(201).json(updatedCart);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const changeQuantity = async (req, res) => {};
