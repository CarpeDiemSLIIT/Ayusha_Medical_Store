import { useEffect, useState } from "react";
import { getOrderById } from "../features/order/orderService.js";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import StatusBar from "../components/order/StatusBar.jsx";
import {
  Box,
  Typography,
  CircularProgress,
  Button,
  useTheme,
} from "@mui/material";
import FlexBetween from "../components/customMUI/FlexBetween.jsx";

export default function OrderConfirmationPage() {
  const [order, setOrder] = useState(null);
  const { palette } = useTheme();
  const navigate = useNavigate();
  const params = useParams();
  const token = useSelector((state) => state.auth.user.token);
  const getOrder = async () => {
    try {
      const order = await getOrderById(params.orderID, token);
      setOrder(order);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getOrder();
  }, []);
  if (!order) {
    return <CircularProgress />;
  }
  return (
    <Box
      alignItems="center"
      display="flex"
      flexDirection="column"
      margin="3rem"
      border="1px solid"
      borderColor="grey.400"
      borderRadius="1rem"
      padding="2rem"
      gap="0.5rem"
    >
      <Typography variant="h1">Order Confirmation</Typography>
      <Typography variant="h4">Thank you for ordering from us.</Typography>
      <Typography variant="body2" align="center">
        We’ve received your order and will contact you as soon as your package
        is shipped . You can find you purchase information below.
      </Typography>
      <Box
        alignItems="center"
        display="flex"
        flexDirection="column"
        borderRadius="1rem"
        padding="1rem"
        gap="0.25rem"
      >
        <Typography variant="h5">Order Summary</Typography>
        <Typography variant="h6">Billing</Typography>
        <Box width="10rem">
          <FlexBetween>
            <Typography variant="body1" color="initial">
              Cart Total
            </Typography>
            <Typography variant="body1" color="initial">
              $ {(order.orderTotal - order.shippingCost).toFixed(2)}
            </Typography>
          </FlexBetween>
          <FlexBetween>
            <Typography variant="body1" color="initial">
              Shipping
            </Typography>
            <Typography variant="body1" color="initial">
              $ {order.shippingCost}.00
            </Typography>
          </FlexBetween>
          <FlexBetween>
            <Typography variant="body1" color="initial">
              Total
            </Typography>
            <Typography variant="body1" color="initial">
              $ {order.orderTotal}
            </Typography>
          </FlexBetween>
        </Box>
      </Box>
      <Typography variant="h5" width="100%" align="center">
        Shipping info
      </Typography>
      <FlexBetween sx={{ alignItems: "flex-start" }} gap="2rem">
        <Box>
          <Typography variant="h6">Shipping method </Typography>
          <Typography variant="body1">{order.deliveryMethod}</Typography>
        </Box>
        <Box>
          <Typography variant="h6">Shipping Address </Typography>
          <Typography variant="body1" color="initial">
            {order.addressID.addressLine},
          </Typography>

          <Typography variant="body1" color="initial">
            {order.addressID.city},
          </Typography>

          <Typography variant="body1" color="initial">
            {order.addressID.state},
          </Typography>

          <Typography variant="body1" color="initial">
            {order.addressID.zip},
          </Typography>

          <Typography variant="body1" color="initial">
            Sri Lanka.
          </Typography>
        </Box>
      </FlexBetween>

      <StatusBar
        sx={{ width: "60%" }}
        activeStep={
          order.orderStatus === "pending"
            ? 0
            : order.orderStatus === "approved"
            ? 1
            : order.orderStatus === "dispatched"
            ? 2
            : 3
        }
      />
      <Button
        // fullWidth
        sx={{
          m: "2rem 0",
          p: "0.5rem",
          backgroundColor: palette.primary.main,
          "&:disabled": { backgroundColor: palette.grey[400] },
          color: palette.background.alt,
          "&:hover": { color: palette.primary.main },
          textTransform: "none",
        }}
        onClick={() => {
          navigate("/profile/orders");
        }}
        // disabled={!address}
      >
        View All Orders
      </Button>
    </Box>
  );
}
