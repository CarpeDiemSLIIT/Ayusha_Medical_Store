import axios from "axios";
const API_URL = "http://ayusha-ayur.com/api/checkout/cart/";

//Get Cart
const getMyCart = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL + "get", config);

  return response.data;
};
//Add new item
const addNewItem = async (itemData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL + "add", itemData, config);

  return response.data;
};

//Delete cart item
const deleteItemRow = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(
    API_URL + "delete-item/" + data.cartItemId,
    config,
    data
  );
  console.log("data");
  return response.data;
};

//TODO
//Update cart item
const updateItemQuantity = async (rowId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(API_URL + "update", rowId, config);
  return response.data;
};

export default {
  getMyCart,
  addNewItem,
  updateItemQuantity,
  deleteItemRow,
};
