import React from "react";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
  MenuItem,
  Dialog,
  DialogTitle,
  IconButton,
  DialogContent,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SellerRegistrationForm from "../components/seller/SellerForm";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import NewCategoryForm from "../components/category/NewCategoryForm";
import AllSellers from "../components/seller/AllSellers";
import AllSeller from "../components/seller/AllSellers";

export default function SellerManagement() {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [open, setOpen] = useState(false);
  const { palette } = useTheme();

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Box
        display="grid"
        gap="30px"
        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
        sx={{
          "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
        }}
      >
        <Typography
          fontWeight="500"
          variant="h3"
          sx={{ mb: "1.5rem" }}
          textAlign="center"
        >
          Seller Management
        </Typography>

        <br />

        <Box>
          <Button
            style={{ width: "100%", marginTop: "1rem" }}
            sx={{
              m: "0.75rem 0",
              backgroundColor: palette.primary.main,
              color: palette.background.alt,
              "&:hover": { color: palette.primary.main },
            }}
            onClick={handleClickOpen}
            endIcon={<AddIcon />}
          >
            Add New Seller
          </Button>
        </Box>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>
            Add new Seller
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <SellerRegistrationForm handleClose={handleClose} />
          </DialogContent>
        </Dialog>
      </Box>

      <Box sx={{ width: "100%" }}>
        <AllSeller />
      </Box>
    </div>
  );
}
