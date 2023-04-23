import amqp from "amqplib";
var channel, connection;

// call connectQueue function
export async function connectQueue() {
  try {
    connection = await amqp.connect(
      "amqps://rremjlle:iBtn6uQrjyzDNBEq7wC-YiLAC1vZJB4S@armadillo.rmq.cloudamqp.com/rremjlle",
      { clientProperties: { connection_name: "admin-server" } }
    );
    channel = await connection.createChannel();
    // connect to 'test-queue', create one if doesnot exist already
    await channel.assertQueue("seller-queue", "direct", { durable: true });
  } catch (error) {
    console.log(error);
  }
}

export const sendSeller = async (data) => {
  try {
    await channel.sendToQueue(
      "seller-queue",
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
