import Address from "../models/Address.js";

export const getAddress = async (req, res) => {
  try {
    const address = await Address.find({ user: req.user.id });
    res.status(200).json(address);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const addAddress = async (req, res) => {
  try {
    const { addressLine, city, state, zip, phoneNumber } = req.body;
    const newAddress = new Address({
      user: req.user.id,
      addressLine,
      city,
      state,
      zip,
      phoneNumber,
    });
    await newAddress.save();
    res.status(201).json(newAddress);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
