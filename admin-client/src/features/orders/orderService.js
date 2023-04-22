import axios from "axios";
const API_URL = "http://localhost:4101/api/admin/order/";

const getAllOrders = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL + "get/all", config);
  return response.data;
};

const getOrderByStatus = async (status, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL + "get/" + status, config);
  return response.data;
};

const changeOrderStatus = async (id, status, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(
    API_URL + "change/" + id,
    { status },
    config
  );
  return response.data;
};

export default {
  getAllOrders,
  getOrderByStatus,
  changeOrderStatus,
};
