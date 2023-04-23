import express from "express";
import { login } from "../controllers/authClient.js";
import { register } from "../controllers/authClient.js";

const router = express.Router();

router.route("/register").post(register);
router.post("/login", login);

export default router;
