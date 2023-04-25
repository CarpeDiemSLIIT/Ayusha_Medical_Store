import mongoose from "mongoose";

const adminSchema = mongoose.Schema(
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
  },
  { timestamps: true },
  { collection: "Admin" }
);

const Admin = mongoose.model("Admin", adminSchema);
export default Admin;
