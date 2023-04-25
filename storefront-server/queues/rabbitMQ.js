import amqp from "amqplib";
import {
  createProduct,
  updateProduct,
  updateProductNoImage,
  deleteProduct,
} from "../controllers/product.js";

var channel, connection;
// call connectQueue function
export async function connectQueue() {
  try {
    connection = await amqp.connect(
      "amqps://rremjlle:iBtn6uQrjyzDNBEq7wC-YiLAC1vZJB4S@armadillo.rmq.cloudamqp.com/rremjlle",
      { clientProperties: { connection_name: "storefront-server" } }
    );
    channel = await connection.createChannel();
    // connect to 'test-queue', create one if does not exist already

    await channel.assertQueue("new-user-queue", "direct", {
      durable: true,
    });
    await channel.assertQueue("product-queue-storefrontserver", {
      durable: true,
    });
    await channel.bindQueue(
      "product-queue-storefrontserver",
      "product-exchange",
      ""
    );

    channel.consume("product-queue-storefrontserver", async (data) => {
      const payload = JSON.parse(data.content.toString());
      switch (payload.event) {
        case "new-product":
          await createProduct(payload.data);
          channel.ack(data);
          break;
        case "edit-product":
          channel.ack(data);
          break;
        case "delete-product":
          await deleteProduct(payload.data);
          channel.ack(data);
          break;
        default:
          console.log("No event found");
          break;
      }
    });

    channel.consume("product-queue-storefrontserver", async (data) => {
      const payload = JSON.parse(data.content.toString());
      switch (payload.event) {
        case "update-product":
          await updateProduct(payload.data);
          channel.ack(data);
          break;
        default:
          console.log("No event found");
          break;
      }
    });

    channel.consume("product-queue-storefrontserver", async (data) => {
      const payload = JSON.parse(data.content.toString());
      switch (payload.event) {
        case "updatenoimg-product":
          await updateProductNoImage(payload.data);
          channel.ack(data);
          break;
        default:
          console.log("No event found");
          break;
      }
    });

    channel.consume("product-queue-storefrontserver", async (data) => {
      const payload = JSON.parse(data.content.toString());
      switch (payload.event) {
        case "new-product":
          await deleteProduct(payload.data);
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

export const sendNewUser = async (data) => {
  // console.log("sendOrder", data);
  try {
    await channel.sendToQueue(
      "new-user-queue",
      // eslint-disable-next-line no-undef
      Buffer.from(
        JSON.stringify({
          event: "new-user",
          data: data,
        })
      )
    );
  } catch (error) {
    console.log(error);
  }
};
