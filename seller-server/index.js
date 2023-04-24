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
import { connectQueue } from "./queues/rabbitMQ.js";

//for login
import authRoutes from "./routes/auth.js";

//for sellers

import sellersRoutes from "./routes/sellers.js";
import {
  createProduct,
  updateProduct,
  updateProductNoImage,
} from "./controllers/products.js";

//for products
import productRoutes from "./routes/products.js";
import { verifyToken } from "./middleware/auth.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
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

const imageHandlingMiddleware = async (req, res, next) => {
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
};

//TODO remove this
async function connectQueueCall() {
  try {
    await connectQueue();
  } catch (error) {
    console.log("Rabbit MQ", error);
  }
}
connectQueueCall();

app.post(
  "/api/seller/products/add",
  uploader.single("imageURL"),
  imageHandlingMiddleware,
  verifyToken,
  createProduct
);

app.put(
  "/api/seller/products/update/:id",
  verifyToken,
  uploader.single("imageURL"),
  imageHandlingMiddleware,
  updateProduct
);

app.put(
  "/api/seller/products/update/noImage/:id",
  verifyToken,
  updateProductNoImage
);

//Route for login

app.use("/api/seller/auth", authRoutes);
app.use("/api/seller/sellers", sellersRoutes);
app.use("/api/seller/products", productRoutes);

//Mongoose setup
const PORT = process.env.PORT || 6001;

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Connected to port ${PORT}`));
  })
  .catch((err) => console.log(`${err} Error connecting}`));
