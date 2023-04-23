import mongoose from "mongoose";

const addressSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  addressLine: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zip: { type: String, required: true },
  phoneNumber: { type: String, required: true, minLength: 10, maxLength: 10 },
});

export default mongoose.model("Address", addressSchema);
