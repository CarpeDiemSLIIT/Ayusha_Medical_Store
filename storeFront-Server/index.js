import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import productRoutes from "./routes/product.js";
import clientRoutes from "./routes/authClient.js";
import { connectQueue } from "./queues/rabbitMQ.js";

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

//routes
app.use("/api/store-front/client-auth/", clientRoutes);
app.use("/api/store-front/product", productRoutes);

//TODO remove
async function connectQueueCall() {
  try {
    await connectQueue();
  } catch (error) {
    console.log("Rabbit MQ", error);
  }
}
connectQueueCall();

/* Mongoose setup */
// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 4001;
mongoose // eslint-disable-next-line no-undef
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));
