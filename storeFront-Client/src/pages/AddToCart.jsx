import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addNewItem } from "../features/cart/cartSlice";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import {
  Alert,
  Backdrop,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Snackbar,
  Typography,
  useTheme,
  Box,
  TextField,
} from "@mui/material";

export default function AddToCart() {
  return (
    <Box display="flex" flexDirection="column">
      cinnamon capsule
      <AddToCartButton productID={"643da6ffb3f0f6b8eb566cab"} />
      Siddhalepa samodagam
      <AddToCartButton productID={"643da754b3f0f6b8eb566cb5"} />
      Iramusu Tea
      <AddToCartButton productID={"643da7ddb3f0f6b8eb566cc9"} />
    </Box>
  );
}

const AddToCartButton = ({ productID }) => {
  const [open, setOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const { palette } = useTheme();

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();

  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  return (
    <>
      <Button
        sx={{
          m: "0.75rem 0",
          backgroundColor: palette.primary.main,
          color: palette.background.alt,
          "&:hover": { color: palette.primary.main },
          textTransform: "none",
        }}
        onClick={handleClickOpen}
        endIcon={<AddIcon />}
      >
        Add to cart
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          Provide the quantity
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
          <Box sx={{ padding: "2rem" }}>
            <TextField
              type="number"
              id="quantity"
              label="Quantity"
              value={quantity}
              onChange={(e) => {
                setQuantity(e.target.value);
              }}
              sx={{ width: "7rem" }}
              inputProps={{ min: 1, max: 10 }}
              error={quantity < 1 || quantity > 10}
            />
          </Box>
          <Button
            fullWidth
            sx={{
              m: "0.75rem 0",
              backgroundColor: palette.primary.main,
              color: palette.background.alt,
              "&:hover": { color: palette.primary.main },
              // textTransform: "none",
            }}
            onClick={() => {
              dispatch(addNewItem({ quantity, productID }));
              handleClose();
            }}
            endIcon={<AddIcon />}
          >
            Add to cart
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};
