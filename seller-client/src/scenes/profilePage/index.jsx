import NavBar from "../navbar";
import Form from "./Form";

import { useDispatch, useSelector } from "react-redux";

import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material";

const ProfilePage = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const theme = useTheme();
  const user = useSelector((state) => state.user);

  return (
    <div>
      <NavBar />

      <Box
        width={isNonMobile ? "50%" : "93%"}
        p="2rem"
        m="1rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        <Form />
      </Box>
    </div>
  );
};

export default ProfilePage;
