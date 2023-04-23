import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Client from "../models/Client.js";

/* Register user */
export const register = async (req, res) => {
  try {
    const { username, password, firstName, lastName, email, phoneNumber } =
      req.body;
    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newClient = new Client({
      username: username,
      password: hashedPassword,
      firstName: firstName,
      lastName: lastName,
      email: email,
      phoneNumber: phoneNumber,
    });
    // Save user and respond
    const savedClient = await newClient.save();
    res.status(200).json(savedClient);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* LOGGING IN */
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const client = await Client.findOne({ username: username });
    if (!client)
      return res.status(400).json({ msg: "Client does not exist. " });

    const isMatch = await bcrypt.compare(password, client.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });

    // eslint-disable-next-line no-undef
    const token = jwt.sign({ id: client._id }, process.env.JWT_SECRET);
    res.status(200).json({ token, client });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


//Get user details


export const getUserDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const client = await Client.findById(id);
    if (!client) return res.status(400).json({ msg: "Client not found." });
    res.status(200).json(client);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};