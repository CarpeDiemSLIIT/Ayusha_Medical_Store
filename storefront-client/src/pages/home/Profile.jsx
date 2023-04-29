import { Box } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/home/Sidebar.jsx";
import WidgetWrapper from "../../components/customMUI/WidgetWrapper.jsx";

const Profile = () => {
  return (
    <div>
      <Box
        width="100%"
        paddingY="2rem"
        paddingX="10%"
        display="flex"
        gap="1rem"
      >
        <Box>
          <Sidebar />
        </Box>
        <Box flexBasis="80%">
          <WidgetWrapper>
            <Outlet />
          </WidgetWrapper>
        </Box>
      </Box>
    </div>
  );
};

export default Profile;
