import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "./Form.jsx";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  return (
    <Box>
      <Box
        width="100%"
        backgroundColor={theme.palette.background.alt}
        p="1rem 6%"
        textAlign="center"
      >
        <Typography fontWeight="bold" fontSize="32px" color="primary">
          Login To Ayusha Store
        </Typography>
      </Box>

      <Box
        width={isNonMobileScreens ? "40%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        <Form />
      </Box>
      <center>

      <p className="text" style={{color: "#063970"}}>New User? <span><Link to="/register" style={{fontWeight:"bold",color: "#063970"}}>Signup</Link></span></p>
      </center>
    </Box>
  );
};

export default LoginPage;
