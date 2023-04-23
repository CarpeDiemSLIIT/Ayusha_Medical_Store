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

//Create Product

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

//Update a Product ✅

export const updateProduct = async (productData) => {
  const productID = productData.id;
  // const productName = req.body.productName;
  // const stock = req.body.stock;
  // const listingPrice = req.body.listingPrice;
  // const netPrice = req.body.netPrice;
  // const description = req.body.description;
  // const imageURL = req.body.imageURL;
  // const categoryID = req.body.categoryID;
  // const rating = req.body.rating;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(productID, {
      ...productData,
    });
    // sendEditProduct(updatedProduct);
    console.log(updatedProduct);

    // res.status(200).json(updatedProduct);
  } catch (error) {
    console.log(error)
  }
};


export const updateProductNoImage = async (productData) => {
  const productID = productData.id;
  // const productName = req.body.productName;
  // const stock = req.body.stock;
  // const listingPrice = req.body.listingPrice;
  // const netPrice = req.body.netPrice;
  // const description = req.body.description;
  // const categoryID = req.body.categoryID;
  // const rating = req.body.rating;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(productID, {
      // productName: productName,
      // stock: stock,
      // listingPrice: listingPrice,
      // netPrice: netPrice,
      // description: description,
      // categoryID: categoryID,
      // rating: rating,
      ...productData
    });
    // sendEditProduct(updatedProduct);
    console.log(updatedProduct);
    // res.status(200).json(updatedProduct);
  } catch (error) {
    console.log(error);
  }
};




//delete product

export const deleteProduct = async (productData) => {
  const productID = productData.id;

  try {
    const deletedProduct = await Product.findByIdAndDelete(productID);
   console.log(deletedProduct);
    // sendDeleteProduct(deletedProduct);
    // res.status(200).json(allProducts);
  } catch (error) {
    console.log(error)
  }
};








