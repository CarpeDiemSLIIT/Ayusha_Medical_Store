import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import NavBar from "../navbar/index";
import Form from "./Form";
import logo from "../../assets/ayusha.svg";

const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  return (
    <Box>
      <Box width="100%" backgroundColor={theme.palette.background.alt}>
        <Typography
          fontWeight="bold"
          fontSize="32px"
          color="primary"
          textAlign={"center"}
        >
          <Box
            sx={{
              "&:hover": {
                cursor: "pointer",
              },
            }}
          >
            <img src={logo} alt="logo" height="40px" />
          </Box>
          Ayusha Store
        </Typography>
      </Box>

      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem"
        m="7rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        <Typography
          fontWeight="500"
          variant="h3"
          sx={{ mb: "1.5rem" }}
          textAlign="center"
        >
          Welcome to the Ayusha Ayurvedic Medical Store
        </Typography>
        <Form />
      </Box>
    </Box>
  );
};

export default LoginPage;
