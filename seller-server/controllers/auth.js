import bycrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Seller from "../models/Seller.js";

//Login function

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const seller = await Seller.findOne({ email: email, status: "active" });
    if (!seller) {
      return res.status(400).json({ message: "Seller not found" });
    }
    const isMatch = await bycrypt.compare(password, seller.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Seller not found" });
    }
    const token = jwt.sign({ id: seller._id }, process.env.JWT_SECRET);
    delete seller.password;
    res.status(200).json({ token, seller });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default login;
