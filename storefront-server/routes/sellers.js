import express from "express";
import {
  getSeller,
  editSeller,
} from "../controllers/sellers.js";

const router = express.Router();

//Read


router.get("/:id", getSeller);

//Update

router.put("/edit/:id", editSeller);

export default router;
