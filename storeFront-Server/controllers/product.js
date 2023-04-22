import Product from "../models/Product.js";

//Get all Products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
};

//Get product by id
export const getProductById = async (req, res) => {
  try {
    const { productID } = req.params;
    const products = await Product.findById(productID);
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
};
