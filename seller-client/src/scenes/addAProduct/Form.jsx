import { useState, useEffect } from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import axios from "axios";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";

import * as React from "react";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
  MenuItem,
  Snackbar,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUpdate } from "../../state";
import Dropzone from "react-dropzone";
import FlexBetween from "../../components/flexBetween";

// onchange in ListingPrice setNetPrice ( listingPrice - (listingPrice * 0.1))
// onchange in NetPrice setListingPrice ( netPrice * 10/9)

const addAProductSchema = yup.object().shape({
  productName: yup.string().required("required"),
  stock: yup.number().required("required"),
  listingPrice: yup.number().required("required"),
  netPrice: yup.number().required("required"),
  description: yup.string().required("required"),
  imageURL: yup.string().required("required"),
  categoryID: yup.string().required("required"),
});

const initialValuesAddProduct = {
  productName: "",
  stock: "",
  listingPrice: "0",
  netPrice: "0",
  imageURL: "",
  description: "",
  categoryID: "",
};

export default function AddAProductForm() {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const { palette } = useTheme();

  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.user);
  const Navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const addAProduct = async (values, onSubmitProps) => {
    try {
      const formData = new FormData();
      for (let value in values) {
        formData.append(value, values[value]);
      }
      formData.append("imageURL", values.imageURL.name);

      const saveProductResponse = await fetch(
        `http://seller-ayusha.com/api/seller/products/add`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const saveProduct = await saveProductResponse.json();

      if (saveProduct) {
        //Navigate(`/products/all/${user._id}`);
        setOpen(true);
      }

      onSubmitProps.resetForm();

      if (!saveProduct) {
        console.log("error");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  //categories
  const [categories, setCategories] = useState([]);
  const getCategories = async () => {
    const response = await fetch(
      "http://seller-ayusha.com/api/seller/products/categories"
    );
    const data = await response.json();
    setCategories(data);
    // console.log(data);
  };
  useEffect(() => {
    getCategories();
    return () => {};
  }, []);

  const handleFormSubmit = async (values, onSubmitProps) => {
    await addAProduct(values, onSubmitProps);
  };

  const dropState = {
    teams: [],
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={initialValuesAddProduct}
      validationSchema={addAProductSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 2" },
            }}
          >
            <TextField
              label="Product Name"
              type="text"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.productName}
              name="productName"
              aria-readonly="true"
              error={
                Boolean(touched.productName) && Boolean(errors.productName)
              }
              helperText={touched.productName && errors.productName}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              label="Stock"
              type="number"
              InputProps={{ inputProps: { min: 1 } }}
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.stock}
              name="stock"
              error={Boolean(touched.stock) && Boolean(errors.stock)}
              helperText={touched.stock && errors.stock}
              sx={{ gridColumn: "span 2" }}
            />
            <Typography sx={{ gridColumn: "span 4" }}>
              Site will take a commission of 10%
            </Typography>
            <TextField
              label="Listing Price ($)"
              type="number"
              InputProps={{ inputProps: { min: 1, step: "0.01" } }}
              onBlur={handleBlur}
              onChange={(e) => {
                handleChange(e);
                setFieldValue(
                  "netPrice",
                  (e.target.value - e.target.value * 0.1).toFixed(2)
                );
              }}
              value={values.listingPrice}
              name="listingPrice"
              error={
                Boolean(touched.listingPrice) && Boolean(errors.listingPrice)
              }
              helperText={touched.listingPrice && errors.listingPrice}
              sx={{ gridColumn: "span 2" }}
            />

            <TextField
              label="Net Price ($)"
              type="number"
              InputProps={{ inputProps: { min: 1, step: "0.01" } }}
              onBlur={handleBlur}
              onChange={(e) => {
                handleChange(e);
                setFieldValue(
                  "listingPrice",
                  ((e.target.value * 10) / 9).toFixed(2)
                );
              }}
              value={values.netPrice}
              name="netPrice"
              error={Boolean(touched.netPrice) && Boolean(errors.netPrice)}
              helperText={touched.netPrice && errors.netPrice}
              sx={{ gridColumn: "span 2" }}
            />
            {/* <CategoryDropDown
              value={values.categoryID}
              onChange={handleChange}
              name="categoryID"
            /> */}
            <FormControl fullWidth sx={{ gridColumn: "span 4" }}>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={values.categoryID}
                label="Category"
                onChange={handleChange}
                name="categoryID"
              >
                {categories.map((category) => (
                  <MenuItem key={category._id} value={category._id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Box
              gridColumn="span 4"
              border={`1px solid ${palette.neutral.medium}`}
              borderRadius="5px"
              p="1rem"
            >
              <Dropzone
                acceptedFiles=".jpg,.jpeg,.png"
                multiple={false}
                onDrop={(acceptedFiles) =>
                  setFieldValue("imageURL", acceptedFiles[0])
                }
              >
                {({ getRootProps, getInputProps }) => (
                  <Box
                    {...getRootProps()}
                    border={`2px dashed ${palette.primary.main}`}
                    p="1rem"
                    sx={{ "&:hover": { cursor: "pointer" } }}
                  >
                    <input {...getInputProps()} />
                    {!values.imageURL ? (
                      <p>Add Picture Here</p>
                    ) : (
                      <FlexBetween>
                        <Typography>{values.imageURL.name}</Typography>
                        <EditOutlinedIcon />
                      </FlexBetween>
                    )}
                  </Box>
                )}
              </Dropzone>
            </Box>

            <TextField
              label="Description"
              onBlur={handleBlur}
              fullWidth
              multiline
              minRows={3}
              onChange={handleChange}
              value={values.description}
              name="description"
              error={
                Boolean(touched.description) && Boolean(errors.description)
              }
              helperText={touched.description && errors.description}
              sx={{ gridColumn: "span 4" }}
            />
          </Box>

          {/* BUTTONS */}
          <Box textAlign="center">
            <Button
              type="submit"
              style={{ width: "50%", marginTop: "2rem" }}
              sx={{
                p: "1rem",
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                "&:hover": { color: palette.primary.main },
              }}
            >
              Add Item
            </Button>
          </Box>
          <Snackbar
            open={open}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            autoHideDuration={6000}
            onClose={handleClose}
          >
            <Alert
              onClose={handleClose}
              severity="success"
              sx={{ width: "100%" }}
            >
              Product Added Successfully
            </Alert>
          </Snackbar>
        </form>
      )}
    </Formik>
  );
}
