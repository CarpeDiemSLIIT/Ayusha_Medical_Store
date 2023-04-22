import express from "express";
import nodemailer from "nodemailer";
import Mailgen from "mailgen";
import axios from "axios";
import dotenv from "dotenv";

const app = express();

app.use(express.json());
dotenv.config();

/** routes */
app.post("/api/send-sms-email", async (req, res) => {
  try {
    const { fullName, orderId, orderTotal, email, phoneNumber } = req.body;
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL, // eslint-disable-line no-undef
        pass: process.env.PASSWORD, // eslint-disable-line no-undef
      },
    });
    let mailGenerator = new Mailgen({
      theme: "default",
      product: {
        name: "Ayusha Ayurvedic Store",
        link: "https://ayushaayurvedic.com/",
      },
    });
    let response = {
      body: {
        name: `${fullName}`,
        intro: "Your order has been placed",
        table: {
          data: [
            {
              OrderId: orderId,
              total: `$ ${orderTotal}`,
            },
          ],
        },
        action: {
          instructions: "To view your order, click here:",

          button: {
            color: "#22BC66", // Optional action button color
            text: "View Order",
            link: "https://ayushaayurvedic.com/",
          },
        },
        outro:
          "Need help, or have questions? Just reply to this email, we'd love to help.",
      },
    };
    let mail = mailGenerator.generate(response);
    let message = {
      from: "Ayusha Ayurvedic Store",
      to: email,
      subject: "Order Placed - Ayusha Ayurvedic Store",
      html: mail,
    };

    await transporter.sendMail(message);

    const SMSdata = {
      user_id: "24765",
      api_key: process.env.SMS_API_KEY, // eslint-disable-line no-undef
      sender_id: "NotifyDEMO",
      to: phoneNumber,
      message: `Dear ${fullName}, thank you for placing an order with Ayusha Ayurveda Store. Your order id is ID:${orderId}, and the total amount paid is $ ${orderTotal}.`,
    };

    //comment this to stop sending SMS
    // const responseSMS = await axios.post(
    //   "https://app.notify.lk/api/v1/send",
    //   SMSdata
    // );
    res.status(200).json({ message: "Email and SMS sent" });
    // console.log(responseSMS);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
