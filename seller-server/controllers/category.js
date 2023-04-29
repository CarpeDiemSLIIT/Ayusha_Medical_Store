import Category from "../models/Category.js";

export const createCategory = async (data) => {
  try {
    const newCategory = new Category({
      name: data.name,
      imageURL: data.imageURL,
    });
    await newCategory.save();
  } catch (error) {
    console.log(error);
  }
};
