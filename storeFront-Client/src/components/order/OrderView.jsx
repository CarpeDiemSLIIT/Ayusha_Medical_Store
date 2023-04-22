import StatusBar from "./StatusBar.jsx";
import {
  Box,
  Typography,
  CircularProgress,
  Button,
  useTheme,
} from "@mui/material";
import FlexBetween from "../customMUI/FlexBetween.jsx";
import CartItemsTable from "../CartItemsTable.jsx";

export default function OrderView({ order }) {
  // console.log(order);
  const theme = useTheme();

  if (!order) {
    return <CircularProgress />;
  }
  return (
    <Box
      alignItems="center"
      display="flex"
      flexDirection="column"
      border="1px solid"
      borderColor="grey.400"
      borderRadius="1rem"
      padding="2rem"
      gap="0.5rem"
      backgroundColor={theme.palette.background.alt}
    >
      <Box width="100%" display="flex" gap="1rem">
        <Typography variant="body1">Order ID: {order._id} </Typography>
        <Typography variant="body1">
          Date: {order.orderDate.substring(0, order.orderDate.indexOf("T"))}
        </Typography>
      </Box>
      <Box display="flex" gap="1rem">
        <Box
          alignItems="center"
          display="flex"
          flexDirection="column"
          border="1px solid"
          borderColor="grey.400"
          padding="1rem"
          borderRadius="1rem"
          gap="0.25rem"
        >
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
        <Box
          border="1px solid"
          borderColor="grey.400"
          padding="1rem"
          borderRadius="1rem"
        >
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
        </Box>
      </Box>
      <CartItemsTable
        items={order.cartID.cartItems}
        total={order.cartID.total}
        options={false}
      />
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
    </Box>
  );
}
