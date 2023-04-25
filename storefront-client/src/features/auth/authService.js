import axios from "axios";

const API_URL = "http://localhost:3001/api/store-front/client-auth/";

// Login user
const login = async (userData) => {
  const response = await axios.post(API_URL + "login", userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};


//Register User

const register = async(userData)=>{
  const response = await axios.post(API_URL + "register",userData)

  if(response.data){
    localStorage.setItem("user",JSON.stringify(response.data))
  }
  return response.data

}


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
  register,
  setMode,
};

export default authService;
