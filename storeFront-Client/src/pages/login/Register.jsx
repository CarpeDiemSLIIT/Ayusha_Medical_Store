import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField } from "@mui/material";
import { Login } from "@mui/icons-material";
import { register, reset } from "../../features/auth/authSlice";
import { toast } from "react-toastify";
import { Stack } from "@mui/system";
import { Link } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    phoneNumber : "",
    email: "",
    password: "",
    confpassword: "",
  });

  const { user, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess) {
      toast.success("Login Success");
    }

    if (isSuccess || user) {
      navigate("/");
    }
    dispatch(reset());
  }, [user, isError, isSuccess, dispatch, navigate, message]);

  function onSubmit(e) {

    e.preventDefault();
    if (formData.password !== formData.confpassword) {
      toast.error("Passwords do not match");
      return;
    }

    const userData = {
        username: formData.username,
      firstName: formData.firstName,
      lastName: formData.lastName,
      phoneNumber: formData.phoneNumber,
      email: formData.email,
      password: formData.password,
    };

    dispatch(register(userData));
  }

  const onChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <Box  pt={5}  display="flex"
    justifyContent="center"
    // alignItems="center"
    // minHeight="100vh"
    >
      <form onSubmit={onSubmit} style={{ display: "grid", gap: 15 }}>
        <Stack gap={2} width="150%">

        <TextField
            required
            label="User Name"
            name="username"
            value={formData.username}
            onChange={onChange}
          />
          <TextField
            required
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={onChange}
          />

          <TextField
            required
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={onChange}
          />

          <TextField
            required
            label="Contact No."
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={onChange}
          />

          <TextField
            required
            label="E-mail"
            name="email"
            value={formData.email}
            onChange={onChange}
          />

          <TextField
            required
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={onChange}
            autoComplete="on"
          />

          <TextField
            required
            label="Confirm Password"
            type="password"
            name="confpassword"
            value={formData.confpassword}
            onChange={onChange}
            autoComplete="on"
          />

          <Button type="submit" variant="contained" >
            Register
          </Button>
          <center>

<p className="text" style={{color: "#063970"}}>Already have an account? <span><Link to="/login" style={{fontWeight:"bold",color: "#063970"}}>Log in</Link></span></p>
</center>
        </Stack>
      </form>

    </Box>
  );
}

export default Register;