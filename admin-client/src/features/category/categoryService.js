import axios from "axios";
const API_URL = "http://localhost:4101/api/admin/category/";

//Get All categories
const getAllCategories = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  // TODO
  const response = await axios.get(API_URL + "all", config);
  return response.data;
};
//Add new category
const addNewCategory = async (categoryData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  // TODO
  const response = await axios.post(API_URL + "new", categoryData, config);
  return response.data;
};
//Update category
const updateCategory = async (categoryData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  // TODO
  const response = await axios.put(API_URL + "update", config, categoryData);
  return response.data;
};
//Delete category
const deleteCategory = async (categoryId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  // TODO
  const response = await axios.delete(API_URL + "delete", categoryId, config);
  return response.data;
};

export default {
  getAllCategories,
  addNewCategory,
  updateCategory,
  deleteCategory,
};
