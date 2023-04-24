import amqp from "amqplib";
var channel, connection;
import { newSeller } from "../controllers/sellers.js";
import { createCategory } from "../controllers/category.js";

// call connectQueue function
export async function connectQueue() {
  try {
    connection = await amqp.connect(
      "amqps://rremjlle:iBtn6uQrjyzDNBEq7wC-YiLAC1vZJB4S@armadillo.rmq.cloudamqp.com/rremjlle",
      { clientProperties: { connection_name: "seller-server" } }
    );
    channel = await connection.createChannel();

    // connect to 'test-queue', create one if doesnot exist already
    await channel.assertQueue("seller-queue", "direct", { durable: true });
    await channel.assertQueue("category-queue", "direct", { durable: true });
    await channel.assertExchange("product-exchange", "fanout", {
      durable: true,
    });

    channel.consume("seller-queue", async (data) => {
      const payload = JSON.parse(data.content.toString());
      // console.log(payload);
      switch (payload.event) {
        case "new-seller":
          await newSeller(payload.data);
          channel.ack(data);
          break;
        case "edit-seller":
          // await newSeller(data.content.toString());
          // channel.ack(data);
          break;
        case "delete-seller":
          // await newSeller(data.content.toString());
          // channel.ack(data);
          break;
        default:
          console.log("No event found");
          break;
      }
    });
    channel.consume("category-queue", async (data) => {
      const payload = JSON.parse(data.content.toString());
      switch (payload.event) {
        case "new-category":
          await createCategory(payload.data);
          channel.ack(data);
          break;
        default:
          console.log("No event found");
          break;
      }
    });
  } catch (error) {
    console.log(error);
  }
}

//edit seller
export const sendEditSeller = async (sellerData) => {
  try {
    await channel.sendToQueue(
      "seller-queue",
      Buffer.from(
        JSON.stringify({
          event: "edit-seller",
          data: sellerData,
        })
      )
    );
  } catch (error) {
    console.log(error.message);
  }
};

//edit seller password
export const sendEditSellerPassword = async (sellerData) => {
  try {
    await channel.sendToQueue(
      "seller-queue",

      Buffer.from(
        JSON.stringify({
          event: "edit-seller-password",
          data: sellerData,
        })
      )
    );
  } catch (error) {
    console.log(error.message);
  }
};

//create product
export const sendProduct = async (pData) => {
  // console.log("sendProduct", pData);
  try {
    await channel.publish(
      "product-exchange",
      "",
      Buffer.from(
        JSON.stringify({
          event: "new-product",
          data: pData,
        })
      )
    );
  } catch (error) {
    console.log(error.message);
  }
};

//edit product
export const sendEditProduct = async (pData) => {
  try {
    await channel.publish(
      "product-exchange",
      "",
      Buffer.from(
        JSON.stringify({
          event: "edit-product",
          data: pData,
        })
      )
    );
  } catch (err) {
    console.log(err.message);
  }
};

export const sendDeleteProduct = async (pData) => {
  try {
    await channel.publish(
      "product-exchange",
      "",
      Buffer.from(
        JSON.stringify({
          event: "delete-product",
          data: pData,
        })
      )
    );
  } catch (err) {
    console.log(err.message);
  }
};
