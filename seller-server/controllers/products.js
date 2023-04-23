import Product from "../models/Product.js";

import bodyParser from "body-parser";
import express from "express";
const app = express();
import Category from "../models/Category.js";

app.use(bodyParser.urlencoded({ extended: true }));

//Create a new Product ✅
export const createProduct = async (req, res) => {
  const {
    productName,
    description,
    stock,
    listingPrice,
    netPrice,
    imageURL,
    categoryID,
  } = req.body;

  const { id } = req.user;
  console.log(imageURL);
  try {
    const newProduct = new Product({
      sellerID: id,
      productName: productName,
      stock: stock,
      listingPrice: listingPrice,
      netPrice: netPrice,
      description: description,
      imageURL: imageURL,
      categoryID: categoryID,
      rating: 0,
    });
    const product = await newProduct.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
};

//Get all Products ✅
export const getAllProducts = async (req, res) => {
  try {
    const id = req.params.id;

    const products = await Product.find({ sellerID: id, status: "active" });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
};

//Get a single Product ✅

export const getProductById = async (req, res) => {
  const productID = req.params.id;
  const id = req.user.id;
  try {
    const product = await Product.find({
      _id: productID,
      sellerID: id,
    });
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
};

//Update a Product ✅

export const updateProduct = async (req, res) => {
  const productID = req.params.id;
  const productName = req.body.productName;
  const stock = req.body.stock;
  const listingPrice = req.body.listingPrice;
  const netPrice = req.body.netPrice;
  const description = req.body.description;
  const imageURL = req.body.imageURL;
  const categoryID = req.body.categoryID;
  const rating = req.body.rating;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(productID, {
      productName: productName,
      stock: stock,
      listingPrice: listingPrice,
      netPrice: netPrice,
      description: description,
      imageURL: imageURL,
      categoryID: categoryID,
      rating: rating,
    });
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const updateProductNoImage = async (req, res) => {
  const productID = req.params.id;
  const productName = req.body.productName;
  const stock = req.body.stock;
  const listingPrice = req.body.listingPrice;
  const netPrice = req.body.netPrice;
  const description = req.body.description;
  const categoryID = req.body.categoryID;
  const rating = req.body.rating;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(productID, {
      productName: productName,
      stock: stock,
      listingPrice: listingPrice,
      netPrice: netPrice,
      description: description,
      categoryID: categoryID,
      rating: rating,
    });
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json(error);
  }
};

//Delete a Product ✅

export const deleteProduct = async (req, res) => {
  const productID = req.params.id;

  try {
    const deletedProduct = await Product.findByIdAndDelete(productID);
    const allProducts = await Product.find({
      sellerID: req.user.id,
      status: "active",
    });
    res.status(200).json(allProducts);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Path: products/categories
// get categories

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getCategoriesById = async (req, res) => {
  try {
    const categoryID = req.params.id;
    const categories = await Category.find({ _id: categoryID });
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
};
