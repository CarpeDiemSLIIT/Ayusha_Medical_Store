import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
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

    <Grid
      container
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
    >
      {product.length ? (
        product.map((product, index) => (
          <Grid item xs={2} sm={4} md={4} key={index}>
            <Card sx={{ maxWidth: 400, height: 500 }}>
              <CardMedia
                component="img"
                image={product.imageURL}
                sx={{
                  height: "60%",
                  objectFit: "contain",
                }}
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null;
                  currentTarget.src = "https://via.placeholder.com/500";
                }}
              />

              <CardActionArea
                sx={{
                  height: "35%",
                }}
                onClick={() => {
                  navigate(`/product/${product._id}`);
                }}
              >
                <CardContent>
                  <Box>
                    <Typography gutterBottom variant="h5" component="div">
                      {product.productName}
                    </Typography>
                  </Box>

                  <Typography variant="body2" color="text.secondary">
                    ${product.listingPrice}
                  </Typography>
                  <div>
                      {[...Array(product.rating)].map((_, i) => (
                          <span key={i}>&#9733;</span>
                      ))}
                      {[...Array(5 - product.rating)].map((_, i) => (
                          <span key={i}>&#9734;</span>
                      ))}
                   </div>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))
      ) : (
        <Grid item xs={12} sm={12} md={12} textAlign="center" > <img src= "https://via.placeholder.com/500" alt="no data" style={{height:"40%"}} /> <Typography variant="h4" color="text.secondary">No Data Found</Typography></Grid>
      )}
    </Grid>
  );
};

export default Catalog;
