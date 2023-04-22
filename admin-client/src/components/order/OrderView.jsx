import {
  Box,
  Typography,
  CircularProgress,
  Button,
  useTheme,
} from "@mui/material";
import FlexBetween from "../customMUI/FlexBetween.jsx";
import CartItemsTable from "./CartItemsTable.jsx";
import { useDispatch } from "react-redux";
import {
  approveOrder,
  dispatchOrder,
  deliverOrder,
} from "../../features/orders/orderSlice";

export default function OrderView({ order }) {
  const { palette } = useTheme();
  const theme = useTheme();
  const dispatch = useDispatch();
  if (!order) {
    return <CircularProgress />;
  }
  return (
    <Box
      alignItems="center"
      display="flex"
      flexDirection="column"
      // border="1px solid"
      borderColor="grey.400"
      // borderRadius="1rem"
      padding="2rem"
      gap="0.5rem"
      width="100%"
      backgroundColor={theme.palette.primary.light}
      // backgroundColor="red"
    >
      {/* <Box width="100%" display="flex" gap="1rem">
        <Typography variant="body1">Order ID: {order._id} </Typography>
        <Typography variant="body1">
          Date: {order.orderDate.substring(0, order.orderDate.indexOf("T"))}
        </Typography>
      </Box> */}
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
              <Typography variant="body1">Cart Total</Typography>
              <Typography variant="body1">
                $ {(order.orderTotal - order.shippingCost).toFixed(2)}
              </Typography>
            </FlexBetween>
            <FlexBetween>
              <Typography variant="body1">Shipping</Typography>
              <Typography variant="body1">$ {order.shippingCost}.00</Typography>
            </FlexBetween>
            <FlexBetween>
              <Typography variant="body1">Total</Typography>
              <Typography variant="body1">$ {order.orderTotal}</Typography>
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
              <Typography variant="body1">
                {order.addressID.addressLine},
              </Typography>

              <Typography variant="body1">{order.addressID.city},</Typography>

              <Typography variant="body1">{order.addressID.state},</Typography>

              <Typography variant="body1">{order.addressID.zip},</Typography>

              <Typography variant="body1">Sri Lanka.</Typography>
            </Box>
          </FlexBetween>
        </Box>
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
          <Typography variant="h6">User Info</Typography>
          <Box>
            <FlexBetween gap="1rem">
              <Typography variant="body1">User&nbsp;ID:</Typography>
              <Typography variant="body1">{order.userID._id}</Typography>
            </FlexBetween>
            <FlexBetween gap="1rem">
              <Typography variant="body1">Full Name:</Typography>
              <Typography variant="body1">
                {`${order.userID.firstName} ${order.userID.lastName}`}
              </Typography>
            </FlexBetween>
            <FlexBetween gap="1rem">
              <Typography variant="body1">Email:</Typography>
              <Typography variant="body1">{order.userID.email}</Typography>
            </FlexBetween>
            <FlexBetween gap="1rem">
              <Typography variant="body1">Phone Number :</Typography>
              <Typography variant="body1">
                {order.userID.phoneNumber}
              </Typography>
            </FlexBetween>
          </Box>
        </Box>
      </Box>
      <CartItemsTable
        items={order.cartID.cartItems}
        total={order.cartID.total}
      />
      {(order.orderStatus === "pending" ||
        order.orderStatus === "approved" ||
        order.orderStatus === "dispatched") && (
        <Box display="flex" justifyContent="right" width="100%" gap="1rem">
          <Button
            sx={{
              p: "0.75rem",
              // backgroundColor: palette.warning.main,
              // color: palette.background.alt,
              "&:hover": {
                color: palette.background.alt,
                backgroundColor: palette.warning.dark,
              },
              textTransform: "none",
            }}
            variant="outlined"
            color="warning"
            onClick={() => {}}
          >
            Cancel
          </Button>
          <Button
            sx={{
              p: "0.75rem",
              backgroundColor: palette.primary.main,
              color: palette.background.alt,
              "&:hover": { color: palette.primary.main },
              textTransform: "none",
            }}
            variant="outlined"
            onClick={() => {
              order.orderStatus === "pending"
                ? dispatch(approveOrder(order._id))
                : order.orderStatus === "approved"
                ? dispatch(dispatchOrder(order._id))
                : order.orderStatus === "dispatched"
                ? dispatch(deliverOrder(order._id))
                : console.log("order already delivered");
            }}
          >
            {order.orderStatus === "pending"
              ? "Approve"
              : order.orderStatus === "approved"
              ? "Dispatch"
              : order.orderStatus === "dispatched"
              ? "Deliver"
              : "Invalid"}
          </Button>
        </Box>
      )}
    </Box>
  );
}
//q: how to turn off mui button capitalization
//a:
