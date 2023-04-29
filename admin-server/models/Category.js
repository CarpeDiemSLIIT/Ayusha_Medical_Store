import mongoose from "mongoose";

const categorySchema = mongoose.Schema(
  {
    name: {
      type: "String",
      required: true,
      unique: true,
    },
    imageURL: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Category = mongoose.model("Category", categorySchema);

export default Category;
