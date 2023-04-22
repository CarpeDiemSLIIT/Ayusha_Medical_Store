import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  IconButton,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import WidgetWrapper from "./customMUI/WidgetWrapper";
import FlexBetween from "./customMUI/FlexBetween";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  return (
    <Box
      sx={{
        backgroundColor: palette.background.alt,
        borderRadius: "0.75rem",
      }}
    >
      <Selection name="All Orders" url="orders/all" />
      <Divider />
      <Selection name="&nbsp;&nbsp;Pending Orders" url="orders/pending" />
      <Divider />
      <Selection name="&nbsp;&nbsp;Approved Orders" url="orders/approved" />
      <Divider />
      <Selection name="&nbsp;&nbsp;Dispatched Orders" url="orders/dispatched" />
      <Divider />
      <Selection name="&nbsp;&nbsp;Delivered Orders" url="orders/delivered" />
      <Divider />
      {/* <Selection name="&nbsp;&nbsp;Canceled Orders" url="orders/canceled" /> */}
      <Divider />
      <Selection name="Category" url="category-management" />
      <Divider />
      <Selection name="Seller Management" url="seller-management" />
    </Box>
  );
}

const Selection = ({ name, url }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  return (
    <Box
      width="100%"
      onClick={() => {
        navigate(`/${url}`);
      }}
      sx={{
        "&:hover": {
          backgroundColor: palette.primary.light,
          cursor: "pointer",
        },
      }}
      padding="1.0rem"
    >
      <Typography variant="h5" color={palette.neutral.dark}>
        {name}
      </Typography>
    </Box>
  );
};
