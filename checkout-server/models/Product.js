import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  sellerID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Sellers",
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
    required: false,
  },
  categoryID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: false,
  },
  rating: {
    type: Number,
    required: false,
    default: 0,
  },
  status: {
    type: String,
    default: "active",
    required: true,
  },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
