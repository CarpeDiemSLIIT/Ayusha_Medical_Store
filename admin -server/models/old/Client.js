import mongoose from "mongoose";

const clientSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      min: 2,
      max: 50,
    },
    password: {
      type: String,
      required: true,
      min: 5,
    },
    firstName: {
      type: String,
      required: true,
      unique: true,
      min: 2,
      max: 50,
    },
    lastName: {
      type: String,
      required: true,
      unique: true,
      min: 2,
      max: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true },
  { collection: "Admin" }
);

const Client = mongoose.model("Client", clientSchema);
export default Client;
