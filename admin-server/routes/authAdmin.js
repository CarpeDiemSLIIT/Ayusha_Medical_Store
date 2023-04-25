import express from "express";
import { register, login } from "../controllers/authAdmin.js";

const router = express.Router();

router.route("/create-default-admin").post(register);
router.post("/login", login);

export default router;
