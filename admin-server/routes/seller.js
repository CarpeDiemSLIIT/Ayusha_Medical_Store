import express from "express";
import {
  createSeller,
  getSeller,
  suspendSeller,
} from "../controllers/seller.js";
import { verifyToken } from "../middleware/authAdmin.js";

const router = express.Router();

router.route("/add").post(verifyToken, createSeller);
router.route("/all").get(verifyToken, getSeller);
router.route("/suspend/:id").post(verifyToken, suspendSeller);

export default router;
