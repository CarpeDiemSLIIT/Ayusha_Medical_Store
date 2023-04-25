import amqp from "amqplib";
var channel, connection;
import { createOrder } from "../controllers/order.js";

// call connectQueue function
export async function connectQueue() {
  try {
    connection = await amqp.connect(
      "amqps://rremjlle:iBtn6uQrjyzDNBEq7wC-YiLAC1vZJB4S@armadillo.rmq.cloudamqp.com/rremjlle",
      { clientProperties: { connection_name: "admin-server" } }
    );
    channel = await connection.createChannel();
    // connect to 'test-queue', create one if does not exist already
    await channel.assertQueue("seller-queue", "direct", { durable: true });
    await channel.assertQueue("category-queue", "direct", { durable: true });
    await channel.assertQueue("order-queue-new", "direct", { durable: true });
    await channel.assertQueue("order-queue-change", "direct", {
      durable: true,
    });
    await channel.assertQueue("order-queue-change", "direct", {
      durable: true,
    });

    // incoming messages from checkout server
    channel.consume("order-queue-new", async (data) => {
      const payload = JSON.parse(data.content.toString());
      // console.log(payload);
      switch (payload.event) {
        case "new-order":
          await createOrder(payload.data);
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

export const sendSeller = async (data) => {
  try {
    await channel.sendToQueue(
      "seller-queue",
      // eslint-disable-next-line no-undef
      Buffer.from(
        JSON.stringify({
          event: "new-seller",
          data: data,
        })
      )
    );
  } catch (error) {
    console.log(error);
  }
  // close the channel and connection
  // await channel.close();
  // await connection.close();
};

export const sendCategory = async (data) => {
  try {
    await channel.sendToQueue(
      "category-queue",
      // eslint-disable-next-line no-undef
      Buffer.from(
        JSON.stringify({
          event: "new-category",
          data: data,
        })
      )
    );
  } catch (error) {
    console.log(error);
  }
  // close the channel and connection
  // await channel.close();
  // await connection.close();
};

export const sendStatusChange = async (data) => {
  try {
    await channel.sendToQueue(
      "order-queue-change",
      // eslint-disable-next-line no-undef
      Buffer.from(
        JSON.stringify({
          event: "change-status",
          data: data,
        })
      )
    );
  } catch (error) {
    console.log(error);
  }
  // close the channel and connection
  // await channel.close();
  // await connection.close();
};
