import React, { useEffect, useState } from "react";
import AddToCartButton from "../../components/order/AddToCartButton.jsx";
// import Typography from "@mui/material/Typography";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Box,  Chip, Grid, Typography } from "@mui/material";
import { Stack } from "@mui/system";



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
    <Grid container columnSpacing={2} p={3}>
      <Grid item sm={12} md={4}>
        <img src={product.imageURL} alt="" width="100%" />
      </Grid>
      <Grid item sm={12} md={8}>
        <Stack gap={2}>
          <Box>
            <Typography variant="h4">{product.productName}</Typography>
            {product.stock> 0 ? (
              <Chip
                color="success"
                
                variant="outlined"
                label="In Stock"

              />
            ) : (
              <Chip
                color="error"
              
                variant="outlined"
                label="Out of Stock"
              />
            )}
          </Box>
          <Typography variant="h6">{`$ ${product.listingPrice}`}</Typography>
        <Typography variant="body">{product.description}</Typography>
        </Stack>
        <Box pt={4}>
        <AddToCartButton productID={productID} />
        </Box>
      </Grid>
    </Grid>
  );
};

export default Product;
