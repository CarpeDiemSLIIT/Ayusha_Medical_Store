import amqp from "amqplib";
var channel, connection;
import { changeOrderStatus } from "../controllers/order.js";
import { createProduct } from "../controllers/product.js";
import { createNewUser } from "../controllers/client.js";

// call connectQueue function
export async function connectQueue() {
  try {
    connection = await amqp.connect(
      "amqps://rremjlle:iBtn6uQrjyzDNBEq7wC-YiLAC1vZJB4S@armadillo.rmq.cloudamqp.com/rremjlle",
      { clientProperties: { connection_name: "checkout-server" } }
    );
    channel = await connection.createChannel();
    // all the queues and exchanges are created here
    await channel.assertQueue("order-queue-new", "direct", { durable: true });

    await channel.assertQueue("order-queue-change", "direct", {
      durable: true,
    });
    await channel.assertQueue("product-queue-checkoutserver", {
      durable: true,
    });
    await channel.assertQueue("new-user-queue", "direct", {
      durable: true,
    });
    await channel.bindQueue(
      "product-queue-checkoutserver",
      "product-exchange",
      ""
    );
    // incoming messages from checkout server
    channel.consume("order-queue-change", async (data) => {
      const payload = JSON.parse(data.content.toString());
      switch (payload.event) {
        case "change-status":
          await changeOrderStatus(payload.data);
          // channel.ack(data);
          break;
        default:
          console.log("No event found");
          break;
      }
    });
    channel.consume("product-queue-checkoutserver", async (data) => {
      const payload = JSON.parse(data.content.toString());
      switch (payload.event) {
        case "new-product":
          await createProduct(payload.data);
          channel.ack(data);
          break;
        default:
          console.log("No event found");
          break;
      }
    });
    channel.consume("new-user-queue", async (data) => {
      const payload = JSON.parse(data.content.toString());
      switch (payload.event) {
        case "new-user":
          await createNewUser(payload.data);
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
//TODO
//create sendOrder to checkout server
export const sendOrder = async (data) => {
  // console.log("sendOrder", data);
  try {
    await channel.sendToQueue(
      "order-queue-new",
      // eslint-disable-next-line no-undef
      Buffer.from(
        JSON.stringify({
          event: "new-order",
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
