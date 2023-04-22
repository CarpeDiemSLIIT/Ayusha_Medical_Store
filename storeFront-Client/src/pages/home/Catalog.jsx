import { Button, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const Catalog = () => {
  const navigate = useNavigate();
  //get the products from the api
  const [product, setProduct] = useState([]);

  const getAllProducts = async () => {
    try {
      const response = await axios(
        "http://localhost:3001/api/store-front/product/all"
      );

      setProduct(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  //fetch the products from the api
  useEffect(() => {
    getAllProducts();
  }, []);

  if (!product) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <Typography variant="h1">All Products</Typography>
      {product.map((product) => {
        return (
          <div
            key={product._id}
            style={{ background: "green", margin: "2rem" }}
            display="flex"
          >
            <img src={product.imageURL} style={{ height: "200px" }} />
            <Typography variant="h3">{product.productName}</Typography>
            <Typography variant="h4">{product.listingPrice}</Typography>
            <Typography variant="h4">{product.description}</Typography>
            <Button
              onClick={() => {
                navigate(`/product/${product._id}`);
              }}
            >
              View Product
            </Button>
          </div>
        );
      })}
    </div>
  );
};

export default Catalog;
