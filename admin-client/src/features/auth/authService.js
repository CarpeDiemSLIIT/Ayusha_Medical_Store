import axios from "axios";

const API_URL = "http://admin-ayusha.com/api/admin/auth-admin/";

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

const createDefaultAdmin = async () => {
  const response = await axios.post(API_URL + "create-default-admin");
  return response.data;
};
const authService = {
  logout,
  login,
  setMode,
  createDefaultAdmin,
};

export default authService;
