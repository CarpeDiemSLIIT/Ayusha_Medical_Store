import { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
  Snackbar,
  Alert,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addAddress } from "../../features/address/addressSlice.js";

const loginSchema = yup.object().shape({
  addressLine: yup.string().required("required"),
  city: yup.string().required("required"),
  state: yup.string().required("required"),
  zip: yup.string().required("required"),
  phoneNumber: yup
    .string()
    .length(9, "Phone Number Should be 10 Characters!")
    .required("required"),
});

const initialValuesLogin = {
  addressLine: "",
  city: "",
  state: "",
  zip: "",
  phoneNumber: "",
};
export default function NewAddress({ setNewAddressOpen }) {
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const { addresses, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.address
  );

  useEffect(() => {
    if (isSuccess) {
      // navigate("/cart");
      //todo
    }
    return () => {};
  }, [isLoading, isError, isSuccess, message]);

  const handleFormSubmit = (values, onSubmitProps) => {
    dispatch(addAddress({ ...values, phoneNumber: `0${values.phoneNumber}` }));
    if (!isError) {
      onSubmitProps.resetForm();
      setNewAddressOpen(false);
    }
  };

  return (
    <Box
      sx={{
        border: 1,
        padding: "1rem 1rem 0rem 1rem",
        borderRadius: "0.5rem",
        borderColor: "grey.300",
      }}
    >
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValuesLogin}
        validationSchema={loginSchema}
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
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                label="Country"
                disabled
                name="country"
                value="Sri Lanka (curently only available in Sri Lanka)"
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                label="Address Line 1"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.addressLine}
                name="addressLine"
                error={
                  Boolean(touched.addressLine) && Boolean(errors.addressLine)
                }
                helperText={touched.addressLine && errors.addressLine}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                label="City"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.city}
                name="city"
                error={Boolean(touched.city) && Boolean(errors.city)}
                helperText={touched.city && errors.city}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                label="State/District"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.state}
                name="state"
                error={Boolean(touched.state) && Boolean(errors.state)}
                helperText={touched.state && errors.state}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                label="Zip/Postal Code"
                type="number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.zip}
                name="zip"
                error={Boolean(touched.zip) && Boolean(errors.zip)}
                helperText={touched.zip && errors.zip}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                label="Phone Number"
                type="number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.phoneNumber}
                name="phoneNumber"
                error={
                  Boolean(touched.phoneNumber) && Boolean(errors.phoneNumber)
                }
                helperText={touched.phoneNumber && errors.phoneNumber}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            {/* BUTTONS */}
            <Box>
              <Button
                fullWidth
                type="submit"
                sx={{
                  m: "2rem 0",
                  p: "1rem",
                  backgroundColor: palette.primary.main,
                  color: palette.background.alt,
                  "&:hover": { color: palette.primary.main },
                }}
              >
                Add new address
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
}
