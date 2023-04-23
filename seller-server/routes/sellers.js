import express from "express";
import { verifyToken } from "../middleware/auth.js";
import {
  getSeller,
  editSeller,
  changePassword,
} from "../controllers/sellers.js";

const router = express.Router();

//Read

router.put("/edit/changePassword", verifyToken, changePassword);

router.get("/:id", verifyToken, getSeller);

//Update

router.put("/edit/:id", verifyToken, editSeller);

export default router;
