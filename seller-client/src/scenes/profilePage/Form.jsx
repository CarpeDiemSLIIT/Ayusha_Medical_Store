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
  Backdrop,
  CircularProgress,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUpdate } from "../../state";
import { useEffect } from "react";

const updateSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
  about: yup.string().required("required"),
});

export default function Form() {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width : 1000px)");
  const [error, setError] = useState("");
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const isNonMobile = useMediaQuery("(min-width:600px)");

  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);

  //console.log(token);
  // console.log(user.firstName);
  // console.log(user);

  const [editUser, setEditUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const reqUser = await fetch(
        `http://localhost:3101/api/seller/sellers/${user._id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const resData = await reqUser.json();
      //console.log(resData);
      setEditUser(resData);
      //console.log(editUser);
    };
    getUser();
  }, [user._id]);

  if (!editUser) {
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

  const initialValuesUpdate = {
    firstName: editUser.firstName,
    lastName: editUser.lastName,
    email: editUser.email,

    about: editUser.about,
  };

  return (
    <div>
      <Typography
        fontWeight="500"
        variant="h3"
        sx={{ mb: "1.5rem" }}
        textAlign="center"
      >
        Welcome {editUser.firstName} {editUser.lastName}, to the Ayusha
        Ayurvedic Medical Store
      </Typography>
      <Box>
        {/* //{user.firstName} */}
        <Formik initialValues={initialValuesUpdate}>
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
                  label="First Name"
                  type="text"
                  InputProps={{
                    readOnly: true,
                  }}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  name="firstName"
                  aria-readonly="true"
                  error={
                    Boolean(touched.firstName) && Boolean(errors.firstName)
                  }
                  helperText={touched.firstName && errors.firstName}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="Last Name"
                  type="text"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  InputProps={{
                    readOnly: true,
                  }}
                  value={values.lastName}
                  name="lastName"
                  error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="Email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  InputProps={{
                    readOnly: true,
                  }}
                  value={values.email}
                  name="email"
                  error={Boolean(touched.email) && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  label="About"
                  onBlur={handleBlur}
                  InputProps={{
                    readOnly: true,
                  }}
                  fullWidth
                  multiline
                  minRows={3}
                  onChange={handleChange}
                  value={values.about}
                  name="about"
                  error={Boolean(touched.about) && Boolean(errors.about)}
                  helperText={touched.about && errors.about}
                  sx={{ gridColumn: "span 4" }}
                />
              </Box>

              {/* BUTTONS */}
              <Box textAlign="center">
                <Button
                  onClick={() => {
                    Navigate(`/profile/edit/${user._id}`);
                  }}
                  style={{ width: "50%", marginTop: "2rem" }}
                  sx={{
                    p: "1rem",
                    backgroundColor: palette.primary.main,
                    color: palette.background.alt,
                    "&:hover": { color: palette.primary.main },
                  }}
                >
                  Edit
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </div>
  );
}
