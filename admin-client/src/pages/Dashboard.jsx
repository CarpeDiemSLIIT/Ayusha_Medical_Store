import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "../components/header/Header.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar.jsx";
import WidgetWrapper from "../components/customMUI/WidgetWrapper.jsx";
const Dashboard = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  return (
    <Box>
      <Header />
      <Box
        width="100%"
        paddingY="2rem"
        paddingX={isNonMobileScreens ? "10%" : "1%"}
        display="flex"
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreens ? "20%" : undefined}>
          <Sidebar />
        </Box>
        <Box flexBasis="80%">
          <WidgetWrapper>
            <Outlet />
          </WidgetWrapper>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
