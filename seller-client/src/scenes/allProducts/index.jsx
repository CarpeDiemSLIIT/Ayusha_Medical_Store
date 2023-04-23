import * as React from "react";
import NavBar from "../navbar";
import Product from "./Product";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material";
import { useState } from "react";

export default function AllProducts() {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const theme = useTheme();

  return (
    <div>
      <NavBar />
      <Box
        width={isNonMobile ? "80%" : "93%"}
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
          Your Products
        </Typography>

        <Product />
      </Box>
    </div>
  );
}
