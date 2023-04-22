import React, { useEffect, useState } from "react";
import AddToCartButton from "../../components/order/AddToCartButton.jsx";
import Typography from "@mui/material/Typography";
import { useParams } from "react-router-dom";
import axios from "axios";

const Product = () => {
  const { productID } = useParams();
  const [product, setProduct] = useState(null);

  const getProduct = async () => {
    try {
      const response = await axios(
        "http://localhost:3001/api/store-front/product/" + productID
      );

      setProduct(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);
  // fetch data from server
  if (!product) return <div>Loading...</div>;
  return (
    <div>
      <Typography variant="h1"> {product.productName}</Typography>
      <img src={product.imageURL} alt="" />
      <AddToCartButton productID={productID} />
    </div>
  );
};

export default Product;
