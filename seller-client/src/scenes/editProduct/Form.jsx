import { useParams } from "react-router-dom";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import { useState, useEffect } from "react";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { setUpdate } from "../../state";
import Dropzone from "react-dropzone";
import FlexBetween from "../../components/flexBetween";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Avatar from "@mui/material/Avatar";

import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
  MenuItem,
  Snackbar,
  Alert,
} from "@mui/material";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

export default function Form() {
  const addAProductSchema = yup.object().shape({
    productName: yup.string().required("required"),
    stock: yup.number().required("required"),
    listingPrice: yup.number().required("required"),
    netPrice: yup.number().required("required"),
    description: yup.string().required("required"),
    imageURL: yup.string(),
    categoryID: yup.string().required("required"),
    //rating: yup.number().required("required"),
  });
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const { palette } = useTheme();

  const { productID } = useParams();
  //console.log(productID);

  const user = useSelector((state) => state.user);
  const Navigate = useNavigate();

  const [editProduct, setEditProduct] = useState(null);
  const token = useSelector((state) => state.token);

  useEffect(() => {
    const getProduct = async () => {
      const reqData = await fetch(
        `http://localhost:3101/api/seller/products/${productID}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const resData = await reqData.json();
      //console.log(resData);
      setEditProduct(resData[0]);
      //console.log(editProduct);
    };
    getProduct();
  }, [productID]);

  //categories
  const [categories, setCategories] = useState([]);
  const getCategories = async () => {
    const response = await fetch(
      "http://localhost:3101/api/seller/products/categories"
    );
    const data = await response.json();
    setCategories(data);
    // console.log(data);
  };
  useEffect(() => {
    getCategories();
    return () => {};
  }, []);

  if (!editProduct) {
    return (
      <>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </>
    );
  }
  const initialValuesAddProduct = {
    productName: editProduct.productName,
    stock: editProduct.stock,
    listingPrice: editProduct.listingPrice,
    netPrice: editProduct.netPrice,
    imageURL: "",
    description: editProduct.description,
    categoryID: editProduct.categoryID,
    // rating: "",
  };

  const updateProducts = async (values, onSubmitProps) => {
    try {
      //console.log(values);
      const formData = new FormData();
      for (let value in values) {
        formData.append(value, values[value]);
      }
      formData.append("imageURL", values.imageURL.name);

      const updatedResponse = await fetch(
        `http://localhost:3101/api/seller/products/update/${productID}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const saveProduct = await updatedResponse.json();

      //console.log(saveProduct);

      //onSubmitProps.resetForm();

      if (saveProduct) {
        Navigate(`/products/all/${user._id}`);
      }

      if (!saveProduct) {
        console.log("error");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const updateProductNoImage = async (values, onSubmitProps) => {
    console.log("updated");
    try {
      const loggedInResponse = await fetch(
        `http://localhost:3101/api/seller/products/update/noImage/${productID}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(values),
        }
      );

      const loggedIn = await loggedInResponse.json();

      if (loggedIn) {
        Navigate(`/products/all/${user._id}`);
      }

      // if (!loggedIn.ok) {
      //   throw new Error(loggedIn.message);
      // }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (values.imageURL === "") {
      await updateProductNoImage(values, onSubmitProps);
    } else {
      await updateProducts(values, onSubmitProps);
    }
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      validationSchema={addAProductSchema}
      initialValues={initialValuesAddProduct}
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
            {/* <FormControl fullWidth sx={{ gridColumn: "span 4" }}>
                  <InputLabel id="demo-simple-select-label">Category </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={values.categoryID}
                    label="Age"
                    onChange={handleChange}
                  ></Select>
                </FormControl> */}
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
              {!values.imageURL ? (
                <Avatar
                  alt={values.productName}
                  src={`${editProduct.imageURL}`}
                  sx={{ width: 100, height: 100 }}
                  variant="square"
                />
              ) : (
                <></>
              )}
              {console.log(values.imageURL)}
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
                      <p>Change your Product Picture Here</p>
                    ) : (
                      <FlexBetween>
                        <Typography>
                          <p>{values.imageURL.name}</p>
                        </Typography>
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
              Update
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
}
