import Seller from "../models/Seller.js";
import bycrypt from "bcrypt";
import { sendSeller } from "../queues/rabbitMQ.js";

export const createSeller = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const { id } = req.user;

  const salt = await bycrypt.genSalt();
  const passwordHash = await bycrypt.hash(password, salt);

  try {
    const newSeller = new Seller({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: passwordHash,
      createdBy: id,
    });

    const seller = await newSeller.save();
    sendSeller(seller);
    const allSellers = await Seller.find({ status: "active" });
    res.status(201).json(allSellers);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getSeller = async (req, res) => {
  try {
    const sellers = await Seller.find({ status: "active" });
    res.status(200).json(sellers);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const suspendSeller = async (req, res) => {
  const sellerID = req.params.id;

  try {
    const deletedProduct = await Seller.findByIdAndUpdate(
      { _id: sellerID },
      { status: "suspend" }
    );
    const allProducts = await Seller.find({
      status: "active",
    });
    res.status(200).json(allProducts);
  } catch (error) {
    res.status(500).json(error);
  }
};
