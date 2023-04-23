import amqp from "amqplib";
var channel, connection;
import { newSeller } from "../controllers/sellers.js";

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

    channel.consume("test-queue", async (data) => {
      const payload = JSON.parse(data.content.toString());
      // console.log(payload);
      switch (payload.event) {
        case "new-seller":
          await newSeller(payload.data);
          channel.ack(data);
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
  } catch (error) {
    console.log(error);
  }
}
