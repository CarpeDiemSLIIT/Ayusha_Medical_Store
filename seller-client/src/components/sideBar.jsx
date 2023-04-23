import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AddIcon from "@mui/icons-material/Add";
import AlignHorizontalLeftIcon from "@mui/icons-material/AlignHorizontalLeft";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export default function TempDrawer({ state, setState, toggleDrawer }) {
  const user = useSelector((state) => state.user);
  //console.log(window.location.pathname);

  const Navigate = useNavigate();

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {/* {["Profile", "Add New Item", "My Posts"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton
              href={`${text}`.toLowerCase().trim() + `/${user._id}`}
            >
              <ListItemIcon>
                {
                  [
                    <AccountCircleIcon />,
                    <AddIcon />,
                    <AlignHorizontalLeftIcon />,
                  ][index]
                }
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))} */}

        <ListItemButton
          onClick={() => {
            Navigate(`/profile/${user._id}`);
          }}
        >
          <ListItemIcon>
            <AccountCircleIcon />
          </ListItemIcon>
          <ListItemText primary="My Account" />
        </ListItemButton>

        <ListItemButton
          onClick={() => {
            Navigate(`/products/all/${user._id}`);
          }}
        >
          <ListItemIcon>
            <AlignHorizontalLeftIcon />
          </ListItemIcon>
          <ListItemText primary="My Products" />
        </ListItemButton>

        <ListItemButton
          onClick={() => {
            Navigate(`/products/add`);
          }}
        >
          <ListItemIcon>
            <AddIcon />
          </ListItemIcon>
          <ListItemText primary="Add a product" />
        </ListItemButton>
      </List>
    </Box>
  );

  return (
    <div>
      {["left"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
