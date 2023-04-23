import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  sellerID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "sellerID",
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  listingPrice: {
    type: Number,
    required: true,
  },
  netPrice: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageURL: {
    type: String,
    required: true,
  },
  categoryID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  rating: {
    type: Number,
    required: false,
  },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
