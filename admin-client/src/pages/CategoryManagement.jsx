import { useEffect, useState } from "react";
import { reset, getAllCategories } from "../features/category/categorySlice";
import { useDispatch, useSelector } from "react-redux";
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
} from "@mui/material";
import CategoryTable from "../components/category/CategoryTable";
import NewCategoryForm from "../components/category/NewCategoryForm";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";

export default function CategoryManagement() {
  const { categories, isError, message, success, isLoading } = useSelector(
    (state) => state.category
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCategories());
    if (isError) {
      setOpen(true);
    }
  }, [isError]);

  //snackbart
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  if (isLoading || !categories) {
    return (
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }
  return (
    <div>
      <Typography variant="h4" sx={{ m: "1rem 0" }}>
        Category Management
      </Typography>
      <CategoryTable categories={categories} />
      <NewCategory />
      <Snackbar
        open={open}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}

const NewCategory = () => {
  const [open, setOpen] = useState(false);
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
        fullWidth
        sx={{
          m: "0.75rem 0",
          backgroundColor: palette.primary.main,
          color: palette.background.alt,
          "&:hover": { color: palette.primary.main },
        }}
        onClick={handleClickOpen}
        endIcon={<AddIcon />}
      >
        Add New Category
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          Add new Category
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
          <NewCategoryForm handleClose={handleClose} />
        </DialogContent>
      </Dialog>
    </>
  );
};
