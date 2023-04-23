import { DarkMode, LightMode } from "@mui/icons-material";
import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  useTheme,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setMode, logout } from "../../features/auth/authSlice";
import logo from "/ayusha.svg";
import FlexBetween from "../customMUI/FlexBetween";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Header = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;
  const dispatch = useDispatch();
  return (
    <FlexBetween backgroundColor={alt} paddingX="2rem">
      <Box
        sx={{
          "&:hover": {
            cursor: "pointer",
          },
        }}
        onClick={() => navigate("/")}
      >
        <img src={logo} alt="logo" height="40px" />
      </Box>
      <FlexBetween width="7rem">
      <ShoppingCartIcon onClick={() => navigate("/profile/cart")}/>
        <IconButton
          onClick={() => dispatch(setMode())}
          sx={{ fontSize: "25px" }}
        >
          {theme.palette.mode === "dark" ? (
            <DarkMode sx={{ fontSize: "25px" }} />
          ) : (
            <LightMode sx={{ color: dark, fontSize: "25px" }} />
          )}
        </IconButton>
        <Profile />
      </FlexBetween>
    </FlexBetween>
  );
};

export default Header;

function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <IconButton
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <Avatar
          alt="Remy Sharp"
          // src="/static/images/avatar/1.jpg"
          // sx={{ width: 56, height: 56 }}
        />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >

<MenuItem
          onClick={() => navigate("/profile/my")}
        >
          Profile
        </MenuItem>
        <MenuItem
          onClick={() => {
            dispatch(logout());
          }}
        >
          Logout
        </MenuItem>
       
      </Menu>
    </>
  );
}
