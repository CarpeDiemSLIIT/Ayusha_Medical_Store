import User from "../models/Seller.js";
import Seller from "../models/Seller.js";
import bycrypt from "bcrypt";

//Read✅

export const getSeller = async (req, res) => {
  try {
    const sellerID = req.params.id;
    const user = await User.findById(sellerID);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//Update✅

export const editSeller = async (req, res) => {
  const sellerID = req.params.id;
  const fName = req.body.firstName;
  const lName = req.body.lastName;
  const email = req.body.email;
  //const pass = req.body.password;
  const phone = req.body.phoneNumber;
  const companyName = req.body.companyName;
  const about = req.body.about;

  try {
    const update = await User.findByIdAndUpdate(sellerID, {
      firstName: fName,
      lastName: lName,
      //password: pass,
      email: email,
      phoneNumber: phone,
      about: about,
    });

    res.send(update);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const changePassword = async (req, res) => {
  const id = req.user;
  const oldPassword = req.body.currentPassword;
  const newPassword = req.body.newPassword;

  try {
    const seller = await Seller.findById(id.id);
    if (!seller) {
      return res.status(400).json({ message: "Seller not found" });
    }
    const isMatch = await bycrypt.compare(oldPassword, seller.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Confirm Password incorrect!" });
    }
    const salt = await bycrypt.genSalt();
    const passwordHash = await bycrypt.hash(newPassword, salt);
    seller.password = passwordHash;
    await seller.save();
    res.status(200).json(seller);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};