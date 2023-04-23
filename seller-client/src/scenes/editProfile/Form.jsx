import { useState } from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import * as React from "react";
import { useEffect } from "react";
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
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUpdate } from "../../state";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ChangePassword from "../changePassword";

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

  const { userID } = useParams();
  //console.log(userID);

  const isNonMobile = useMediaQuery("(min-width:600px)");

  const token = useSelector((state) => state.token);

  //console.log(token);
  // console.log(user.firstName);
  // console.log(user);

  const [editUser, setEditUser] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const reqUser = await fetch(
        `http://localhost:3101/api/seller/sellers/${userID}`,
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
  }, [userID]);

  const updateDetails = async (values, onSubmitProps) => {
    //console.log("updated");
    try {
      const loggedInResponse = await fetch(
        `http://localhost:3101/api/seller/sellers/edit/${userID}`,
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

      onSubmitProps.resetForm();

      if (loggedIn) {
        setTimeout(() => {
          Navigate(`/profile/${userID}`);
        }, 3000);
      }

      // if (!loggedIn.ok) {
      //   throw new Error(loggedIn.message);
      // }
    } catch (error) {
      setError(error.message);
    }
  };

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
    password: editUser.password,
    about: editUser.about,
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    await updateDetails(values, onSubmitProps);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Typography
        fontWeight="500"
        variant="h3"
        sx={{ mb: "1.5rem" }}
        textAlign="center"
      >
        {" "}
        Hi, {editUser.firstName} {editUser.lastName}, Now you can edit your
        profile
      </Typography>
      <Box>
        {/* //{user.firstName} */}
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValuesUpdate}
          validationSchema={updateSchema}
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
                  label="First Name"
                  type="text"
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
                  value={values.email}
                  name="email"
                  error={Boolean(touched.email) && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                  sx={{ gridColumn: "span 2" }}
                />
                <Button
                  label="Change Password"
                  error={Boolean(touched.password) && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                  sx={{
                    p: "1rem",
                    gridColumn: "span 2",
                    backgroundColor: palette.primary.main,
                    color: palette.background.alt,
                    "&:hover": { color: palette.primary.main },
                  }}
                  onClick={() => {
                    setOpen(true);
                  }}
                >
                  Change Password
                </Button>
                <ChangePassword handleClose={handleClose} open={open} />
                <TextField
                  label="About"
                  onBlur={handleBlur}
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
                  type="submit"
                  onClick={() => {
                    console.log(values);
                  }}
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
      </Box>
    </div>
  );
}
