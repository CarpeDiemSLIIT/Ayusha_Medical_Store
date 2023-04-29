import mongoose from "mongoose";

const sellerSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },

  lastName: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    max: 50,
    unique: true,
  },
  about: {
    type: String,
  },
  rating: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Rating",
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "AdminID",
  },
  status: {
    type: String,
    default: "active",
  },
});

const User = mongoose.model("Seller", sellerSchema);

export default User;
