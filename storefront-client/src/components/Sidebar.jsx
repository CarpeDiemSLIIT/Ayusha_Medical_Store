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
    <WidgetWrapper>
      <FlexBetween flexDirection="column" gap="0.75rem">
        <Selection name="Pending Orders" url="orders/pending-orders" />
        <Selection name="Accepted Orders" url="orders/accepted-orders" />
        <Selection name="Dispatched Orders" url="orders/dispatched-orders" />
        <Selection name="Canceled Orders" url="orders/canceled-orders" />
        <Selection name="Category" url="category-management" />
        <Selection name="Seller Management" url="seller-management" />
      </FlexBetween>
    </WidgetWrapper>
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
      flexDirection="column"
      width="100%"
      onClick={() => {
        navigate(`/${url}`);
        // navigate(0);
      }}
      sx={{
        "&:hover": {
          backgroundColor: palette.primary.light,
          cursor: "pointer",
        },
      }}
    >
      <Typography variant="h4" color={palette.neutral.dark}>
        {name}
      </Typography>
    </Box>
  );
};
