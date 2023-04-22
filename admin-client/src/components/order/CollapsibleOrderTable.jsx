import { useState } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import OrderView from "./OrderView";
import { Chip } from "@mui/material";

function Row({ order }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <TableRow
        sx={{ "& > *": { borderBottom: "unset" } }}
        onClick={() => setOpen(!open)}
      >
        <TableCell component="th" scope="row">
          {order._id}
        </TableCell>
        <TableCell align="left">
          {order.userID.firstName} {order.userID.lastName}
        </TableCell>
        <TableCell align="center">
          {order.orderDate.substring(0, order.orderDate.indexOf("T"))}
        </TableCell>
        <TableCell align="center">{order.orderTotal}</TableCell>
        <TableCell align="center">
          {order.orderStatus === "pending" ? (
            <Chip label="Pending" color="info" variant="outlined" />
          ) : order.orderStatus === "approved" ? (
            <Chip label="Approved" color="primary" variant="outlined" />
          ) : order.orderStatus === "dispatched" ? (
            <Chip label="Dispatched" color="primary" variant="outlined" />
          ) : (
            <Chip label="Delivered" color="primary" variant="filled" />
          )}
        </TableCell>
        <TableCell align="right">
          <IconButton aria-label="expand row" size="small">
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell
          style={{
            paddingBottom: 0,
            paddingTop: 0,
            paddingLeft: 0,
            paddingRight: 0,
          }}
          colSpan={6}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <OrderView order={order} key={order._id} />
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export default function CollapsibleTable({ orders }) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell>Order ID</TableCell>
            <TableCell align="left">Customer</TableCell>
            <TableCell align="center">Date</TableCell>
            <TableCell align="center">Price&nbsp;($)</TableCell>
            <TableCell align="center">Status</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <Row key={order._id} order={order} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
