import * as React from "react";
import FormDialog from "./Form";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Alert, Box, Snackbar } from "@mui/material";

export default function ChangePassword({ open, handleClose }) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [cNewPassword, setcNewPassword] = useState("");
  const [error, setError] = useState("");

  const token = useSelector((state) => state.token);
  const [open1, setOpen] = useState(false);

  const handleClose1 = () => {
    setOpen(false);
  };

  const handleChange1 = (e) => {
    setCurrentPassword(e.target.value);
  };
  const handleChange2 = (e) => {
    setNewPassword(e.target.value);
  };
  const handleChange3 = (e) => {
    setcNewPassword(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      console.log(currentPassword);
      console.log(newPassword);
      console.log(cNewPassword);

      if (newPassword !== cNewPassword) {
        throw new Error("Password Mismatch!");
      }

      const changePasswordRes = await fetch(
        `http://seller-ayusha.com/seller/sellers/edit/changePassword/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            currentPassword,
            newPassword,
          }),
        }
      );

      const success = await changePasswordRes.json();

      if (!changePasswordRes.ok) {
        throw new Error("Current password is incorrect");
      }

      handleClose();
    } catch (error) {
      //alert(error.message);
      setError(error.message);
      setOpen(true);
    }
  };

  return (
    <div>
      <Box>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Change Password</DialogTitle>
          <DialogContent
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              margin: "1rem",
              padding: "2rem",
            }}
          >
            <TextField
              label="Current Password"
              type="password"
              onChange={handleChange1}
              value={currentPassword}
              name="currentPassword"
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              label="New Password"
              type="password"
              onChange={handleChange2}
              value={newPassword}
              name="newPassword"
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              label="Confirm New Password"
              type="password"
              onChange={handleChange3}
              value={cNewPassword}
              name="cNewPassword"
              sx={{ gridColumn: "span 2" }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button
              onClick={() => {
                handleSubmit();
              }}
            >
              Change
            </Button>
          </DialogActions>
        </Dialog>

        {error && (
          <Snackbar
            open={open1}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            autoHideDuration={6000}
            onClose={handleClose1}
          >
            <Alert
              onClose={handleClose1}
              severity="error"
              sx={{ width: "100%" }}
            >
              {error}
            </Alert>
          </Snackbar>
        )}
      </Box>
    </div>
  );
}
