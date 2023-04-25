import axios from "axios";

const API_URL = "http://localhost:4001/api/checkout/order/";

const createOrder = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL + "create", data, config);
  return response.data;
};

const getOrderById = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + "get/" + id, config);
  return response.data;
};
const getMyOrders = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + "get/user/", config);
  return response.data;
};

export default { createOrder };
export { createOrder, getOrderById, getMyOrders };
