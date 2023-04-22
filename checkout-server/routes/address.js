import express from "express";
import { getAddress, addAddress } from "../controllers/address.js";

const router = express.Router();

router.route("/get").get(getAddress);
router.route("/add").post(addAddress);
export default router;
