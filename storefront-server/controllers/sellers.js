import User from "../models/Seller.js";



//Read✅

export const getSeller = async (req, res) => {
  try {
    const sellerID = req.params.id;
    const user = await User.findById(sellerID);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//Update✅

export const editSeller = async (req, res) => {
  const sellerID = req.params.id;
  const rating = req.body.rating;
  

  try {
    const update = await User.findByIdAndUpdate(sellerID, {
      rating: rating,
    });
    res.send(update);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};


