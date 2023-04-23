import Client from "../models/Client.js";

export const createNewUser = async (data) => {
  // console.log(data);
  try {
    const netClient = Client({
      ...data,
    });
    await netClient.save();
  } catch (error) {
    console.log(error);
  }
};
