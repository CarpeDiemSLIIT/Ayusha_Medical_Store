import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import cartService from "./cartService";
const initialState = {
  cart: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const getMyCart = createAsyncThunk(
  "cart/getMyCart",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await cartService.getMyCart(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const addNewItem = createAsyncThunk(
  "cart/addNewItem",
  async (itemData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await cartService.addNewItem(itemData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const deleteRow = createAsyncThunk(
  "cart/deleteRow",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await cartService.deleteItemRow(data, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMyCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMyCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.cart = action.payload[0];
      })
      .addCase(getMyCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.cart = action.payload[0];
      })
      //add new cart item
      .addCase(addNewItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addNewItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.cart = action.payload[0];
      })
      .addCase(addNewItem.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      //delete cart item
      .addCase(deleteRow.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteRow.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.cart = action.payload[0];
      })
      .addCase(deleteRow.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = cartSlice.actions;
export default cartSlice.reducer;
