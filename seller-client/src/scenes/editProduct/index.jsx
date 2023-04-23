import * as React from "react";
import NavBar from "../navbar";
import Form from "./Form";
import { useParams } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material";

export default function EditProduct() {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const theme = useTheme();

  const { productID } = useParams();
  console.log(productID);

  return (
    <div>
      <NavBar />
      <Box
        width={isNonMobile ? "50%" : "93%"}
        p="2rem"
        m="1rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        <Typography
          fontWeight="500"
          variant="h3"
          sx={{ mb: "1.5rem" }}
          textAlign="center"
        >
          Edit Your Product
        </Typography>
        <Form />
      </Box>
    </div>
  );
}
