import Category from "../models/category";

export const createCategory = async (data) => {
  try {
    const newCategory = new Category({
      name: data.name,
      imageURL: data.imageURL,
    });
    await newCategory.save();
  } catch (error) {
    console.log();
  }
};
