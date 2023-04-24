


import React, { useEffect, useState } from "react";
import AddToCartButton from "../../components/order/AddToCartButton.jsx";
// import Typography from "@mui/material/Typography";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Box, Chip, Grid, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import StarRating from "../../components/home/StarRating.jsx";
import "./star.css";

const Product = () => {
  const { productID } = useParams();
  const [product, setProduct] = useState(null);
  const [seller, setSeller] = useState(null);

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

  const getUser = async () => {
    try {
      const response = await axios("" + productID.sellerID);

      setSeller(response.data);
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
            {product.stock > 0 ? (
              <Chip color="success" variant="outlined" label="In Stock" />
            ) : (
              <Chip color="error" variant="outlined" label="Out of Stock" />
            )}
            <Typography variant="h6">
              {seller.firstName} {seller.lastName}
            </Typography>
          </Box>
          <StarRating />
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







// import React, { useEffect, useState } from "react";
// import AddToCartButton from "../../components/order/AddToCartButton.jsx";
// // import Typography from "@mui/material/Typography";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import { Box, Chip, Grid, Typography } from "@mui/material";
// import { Stack } from "@mui/system";
// import StarRating from "../../components/home/StarRating.jsx";
// import "./star.css";

// const Product = () => {
//   const { productID } = useParams();
//   const [product, setProduct] = useState(null);
//   const [seller, setSeller] = useState(null);

//   const getProduct = async () => {
//     try {
//       const response = await axios(
//         "http://localhost:3001/api/store-front/product/" + productID
//       );

//       setProduct(response.data);
//       console.log(response.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const getUser = async () => {

//     console.log(product.sellerID)


//     try {
//       const response = await axios("http://localhost:3001/api/seller/sellers/6444f682bb44d72cb64130f8" );

//       setSeller(response.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     getProduct();
//   }, []);

//   useEffect(() => {
//     getUser();
//   })

//   // fetch data from server
//   if (!seller  ) return <div>Loading...</div>;
//   if (!product  ) return <div>Loading...</div>;
//   return (
//     <Grid container columnSpacing={2} p={3}>
//       <Grid item sm={12} md={4}>
//         <img src={product.imageURL} alt="" width="100%" />
//       </Grid>
//       <Grid item sm={12} md={8}>
//         <Stack gap={2}>
//           <Box>
//             <Typography variant="h4">{product.productName}</Typography>
//             {product.stock > 0 ? (
//               <Chip color="success" variant="outlined" label="In Stock" />
//             ) : (
//               <Chip color="error" variant="outlined" label="Out of Stock" />
//             )}
//             <Typography variant="h6">
//               {seller.firstName} {seller.lastName}
//             </Typography>
//           </Box>
//           <StarRating />
//           <Typography variant="h6">{`$ ${product.listingPrice}`}</Typography>
//           <Typography variant="body">{product.description}</Typography>
//         </Stack>
//         <Box pt={4}>
//           <AddToCartButton productID={productID} />
//         </Box>
//       </Grid>
//     </Grid>
//   );
// };

// export default Product;





