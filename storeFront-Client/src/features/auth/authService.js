import axios from "axios";

const API_URL = "http://localhost:4001/client-auth/";

// Login user
const login = async (userData) => {
  const response = await axios.post(API_URL + "login", userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// Logout user
const logout = () => {
  localStorage.removeItem("user");
};

const setMode = (state) => {
  localStorage.setItem("mode", state);
};

const API_URL_ADDRESS = "http://localhost:4001/address/";

const authService = {
  logout,
  login,
  setMode,
};

export default authService;
