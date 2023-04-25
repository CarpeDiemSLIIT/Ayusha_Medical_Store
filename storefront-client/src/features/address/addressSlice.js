import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import addressService from "./addressService.js";

const initialState = {
  addresses: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const getAddress = createAsyncThunk(
  "address/getAddress",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await addressService.getAddress(token);
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

export const addAddress = createAsyncThunk(
  "address/addAddress",
  async (addressDetails, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await addressService.addAddress(addressDetails, token);
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

//create slice
export const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    reset: (state) => {
      state = initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.addresses = action.payload;
      })
      .addCase(getAddress.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(addAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.addresses.push(action.payload);
      })
      .addCase(addAddress.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      });
  },
});

export const { reset } = addressSlice.actions;
export default addressSlice.reducer;
