import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import firebase from "firebase/compat/app";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

import authAdminRoutes from "./routes/authAdmin.js";
import categoriesRoutes from "./routes/categories.js";
import sellerRoute from "./routes/seller.js";
import orderRoutes from "./routes/order.js";
import { newCategory } from "./controllers/categories.js";
import { verifyToken } from "./middleware/authAdmin.js";
import { connectQueue } from "./queues/seller-queue.js";

/* configurations */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "same-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY, //eslint-disable-line no-undef
  authDomain: process.env.FIREBASE_AUTH_DOMAIN, //eslint-disable-line no-undef
  projectId: process.env.FIREBASE_PROJECT_ID, //eslint-disable-line no-undef
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET, //eslint-disable-line no-undef
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID, //eslint-disable-line no-undef
  appId: process.env.FIREBASE_APP_ID, //eslint-disable-line no-undef
};

firebase.initializeApp(firebaseConfig);
const storage = getStorage();
const uploader = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // limiting files size to 5 MB
  },
});

/* Routes with files */
app.post(
  "/api/admin/category/new",
  uploader.single("imageURL"),
  async (req, res, next) => {
    try {
      const storageRef = ref(storage, `Ayusha/${req.file.originalname}`);
      await uploadBytes(storageRef, req.file.buffer);
      req.body.imageURL = await getDownloadURL(
        ref(storage, `Ayusha/${req.file.originalname}`)
      );
      next();
    } catch (error) {
      res.status(500).json({ message: "Error uploading file", error });
    }
  },
  verifyToken,
  newCategory
);
//TODO remove
async function test() {
  await connectQueue();
}
test();

/* Routes without files */
//TODO add /api/admin
app.use("/api/admin/auth-admin", authAdminRoutes);
app.use("/api/admin/category", categoriesRoutes);
app.use("/api/admin/order", verifyToken, orderRoutes);
app.use("/api/admin/seller", sellerRoute);

/* Mongoose setup */
// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 6001;
mongoose // eslint-disable-next-line no-undef
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));
