import { useState } from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import * as React from "react";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../../state";
// import Dropzone from "react-dropzone";
// import FlexBetween from "../../components/flexBetween";

const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("required"),
  password: yup.string().required("required"),
});

const initialValuesLogin = {
  email: "",
  password: "",
};

const Form = () => {
  const [pageType, setPageType] = useState("login");
  const [error, setError] = useState("");
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const isLogin = pageType === "login";

  const login = async (values, onSubmitProps) => {
    try {
      const loggedInResponse = await fetch(
        "http://seller-ayusha.com/api/seller/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        }
      );
      const loggedIn = await loggedInResponse.json();

      onSubmitProps.resetForm();
      if (loggedIn) {
        dispatch(
          setLogin({
            user: loggedIn.seller,
            token: loggedIn.token,
          })
        );
        // console.log(loggedIn.seller);
        navigate(`profile/${loggedIn.seller._id}`);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) await login(values, onSubmitProps);
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? initialValuesLogin : null}
      validationSchema={isLogin ? loginSchema : null}
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
            gridTemplateColumns="repeat(2, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 2" },
            }}
          >
            <TextField
              label="Email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              sx={{ gridColumn: "span 2" }}
              style={{ width: "50%", margin: "auto" }}
            />
            <TextField
              label="Password"
              type="password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name="password"
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              sx={{ gridColumn: "span 2" }}
              style={{ width: "50%", margin: "auto" }}
            />
          </Box>

          {error && (
            <Box>
              {/* <Typography variant="body1" color="red">
                Credential not correct!
              </Typography> */}
              <br />
              <Stack sx={{ width: "50%", margin: "auto" }} spacing={2}>
                <Alert severity="error">
                  Invalid Credentials , Try Again ☹️
                </Alert>
              </Stack>
            </Box>
          )}

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
              {isLogin ? "LOGIN" : "REGISTER"}
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default Form;
