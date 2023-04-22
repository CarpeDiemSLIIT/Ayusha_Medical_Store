import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import cartReducer from "../features/cart/cartSlice.js";
import addressReducer from "../features/address/addressSlice.js";
import orderReducer from "../features/order/orderSlice.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    address: addressReducer,
    order: orderReducer,
  },
});
