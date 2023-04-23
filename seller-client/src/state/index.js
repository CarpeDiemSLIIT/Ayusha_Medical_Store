import { PictureAsPdf } from "@mui/icons-material";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  user: "null",
  token: "null",
};
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = "null";
      state.token = "null";
      window.localStorage.clear();
      window.location.href = "/";
    },
    setUpdate: (state, action) => {
      console.log(action.payload);
      state.user = action.payload.user;
    },
  },
});

export const { setMode, setLogin, setLogout, setUpdate } = authSlice.actions;
export default authSlice.reducer;
