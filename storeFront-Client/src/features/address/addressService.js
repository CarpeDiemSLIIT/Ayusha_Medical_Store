import axios from "axios";

const API_URL = "http://localhost:4001/api/checkout/address/";

const getAddress = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const request = await axios.get(API_URL + "get", config);
  return request.data;
};

const addAddress = async (addressData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const request = await axios.post(API_URL + "add", addressData, config);
  return request.data;
};

export default { getAddress, addAddress };
