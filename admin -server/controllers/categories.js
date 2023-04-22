import Category from "../models/Category.js";

export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const newCategory = async (req, res) => {
  const category = req.body;
  const newCategory = new Category(category);
  try {
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
export const updateCategory = async (req, res) => {
  const categoryData = req.body;
  const { id } = req.params;
  const category = await Category.findById(req.params.id);

  if (!category) return res.status(404).send(`No category with id: ${id}`);

  const updatedCategory = await Category.findByIdAndUpdate(id, categoryData, {
    new: true,
  });
  //TODO
  res.json({ message: "Under construction" });
};
export const deleteCategory = async (req, res) => {
  const { id } = req.params;

  if (!Category.isValid(id))
    return res.status(404).send(`No category with id: ${id}`);

  await Category.findByIdAndRemove(id);

  res.json(Category);
};
