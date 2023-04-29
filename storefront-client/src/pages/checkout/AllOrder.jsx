import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Box,
  Typography,
  CircularProgress,
  Button,
  useTheme,
  Backdrop,
} from "@mui/material";
import { getMyOrders } from "../../features/order/orderService.js";
import StatusBar from "../../components/order/StatusBar.jsx";
import FlexBetween from "../../components/customMUI/FlexBetween.jsx";
import OrderView from "../../components/order/OrderView.jsx";

export default function AllOrder() {
  const [orders, setOrders] = useState(null);
  const { palette } = useTheme();
  const shippingCost = 2;
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.user.token);
  const getOrders = async () => {
    try {
      const orders = await getMyOrders(token);
      setOrders(orders);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getOrders();
  }, []);
  if (!orders) {
    return (
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }
  if (orders.length === 0) {
    return <>No orders</>;
  }
  return (
    <Box padding="2rem" display="flex" flexDirection="column" gap="2rem">
      <Typography variant="h1">My Orders</Typography>
      {orders.map((order) => (
        <OrderView order={order} key={order._id} />
      ))}
    </Box>
  );
}
