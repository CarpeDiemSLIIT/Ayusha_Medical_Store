import Product from "../models/Product.js";
export const createProduct = async (productData) => {
  console.log(productData);

  try {
    const newProduct = Product({
      ...productData,
    });
    await newProduct.save();
  } catch (error) {
    console.log(error);
  }
};
