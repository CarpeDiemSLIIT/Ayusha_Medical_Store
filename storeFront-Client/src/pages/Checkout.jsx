import {
  Box,
  Card,
  Typography,
  Button,
  CircularProgress,
  useTheme,
  Alert,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Backdrop,
} from "@mui/material";
import { useEffect, useState } from "react";
import FlexBetween from "../components/customMUI/FlexBetween";
import WidgetWrapper from "../components/customMUI/WidgetWrapper";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { getMyCart } from "../features/cart/cartSlice";
import GetAddress from "../components/GetAddress/GetAddress.jsx";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { createOrder as createOrderAPI } from "../features/order/orderService.js";
import GetDeliveryMethod from "../components/GetAddress/GetDeliveryMethod";

export default function Checkout() {
  const token = useSelector((state) => state.auth.user.token);
  const [address, setAddress] = useState(null);
  const [shippingMethod, setShippingMethod] = useState("DHL");
  const [shippingCost, setShippingCost] = useState(2);
  const { palette } = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { cart, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.cart
  );
  useEffect(() => {
    dispatch(getMyCart());
    return () => {};
  }, []);

  //Dialog box
  const [openDialog, setOpenDialog] = useState(false);
  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  ///paypal
  const [show, setShow] = useState(false);
  // const [success, setSuccess] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState("");
  const [orderID, setOrderID] = useState(false);

  // creates a paypal order
  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            description: `AyushaCartID: ${cart._id}`,
            amount: {
              currency_code: "USD",
              value: cart.total + shippingCost,
            },
          },
        ],
        // not needed if a shipping address is actually needed
        application_context: {
          shipping_preference: "NO_SHIPPING",
        },
      })
      .then((orderID) => {
        setOrderID(orderID);
        return orderID;
      });
  };

  // check Approval
  const onApprove = (data, actions) => {
    return actions.order.capture().then(async (details) => {
      const orderDetails = {
        cartID: cart._id,
        paymentID: details.id,
        addressID: address._id,
        orderTotal: details.purchase_units[0].amount.value,
        paymentStatus: "paid",
        deliveryMethod: shippingMethod,
        shippingCost: shippingCost,
      };
      const order = await createOrderAPI(orderDetails, token);
      if (order) navigate(`/order-confirmation/${order._id}`);
    });
  };
  //capture likely error
  const onError = (data, actions) => {
    console.log(data);
    // setErrorMessage("An Error occured with your payment ");
  };

  if (!cart && isSuccess) {
    return <>invalid request</>;
  }
  return (
    <Box padding="2rem">
      {isLoading && !cart ? (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        cart &&
        cart.cartItems && (
          <FlexBetween
            gap="2rem"
            sx={{
              alignItems: "flex-start",
            }}
          >
            <WidgetWrapper
              width="80%"
              gap="1rem"
              display="flex"
              flexDirection="column"
              padding="3rem"
            >
              <Box>
                <GetAddress setAddress={setAddress} />
              </Box>

              <Box>
                <GetDeliveryMethod
                  setShippingMethod={setShippingMethod}
                  setShippingCost={setShippingCost}
                />
              </Box>
            </WidgetWrapper>

            <Card sx={{ minWidth: "30%", padding: "1rem" }}>
              <Box
                width="100%"
                gap="2rem"
                display="flex"
                flexDirection="column"
              >
                <Typography variant="h4" color="initial">
                  Order summary
                </Typography>
                <FlexBetween>
                  <Typography variant="h6" color="initial">
                    Cart Total
                  </Typography>
                  <Typography variant="h5" color="initial">
                    $ {cart.total}
                  </Typography>
                </FlexBetween>
                <FlexBetween>
                  <Typography variant="h6" color="initial">
                    Shipping
                  </Typography>
                  <Typography variant="h5" color="initial">
                    $ {shippingCost}
                  </Typography>
                </FlexBetween>
                <FlexBetween>
                  <Typography variant="h6" color="initial">
                    Total
                  </Typography>
                  <Typography variant="h5" color="initial">
                    $ {cart.total + shippingCost}
                  </Typography>
                </FlexBetween>
              </Box>
              <Box>
                <Button
                  fullWidth
                  sx={{
                    m: "2rem 0",
                    p: "1rem",
                    backgroundColor: palette.primary.main,
                    "&:disabled": { backgroundColor: palette.grey[400] },
                    color: palette.background.alt,
                    "&:hover": { color: palette.primary.main },
                  }}
                  onClick={() => {
                    handleClickOpenDialog();
                  }}
                  disabled={!address}
                >
                  Checkout
                </Button>
              </Box>
            </Card>
          </FlexBetween>
        )
      )}

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>
          Make Payment
          <IconButton
            aria-label="close"
            onClick={handleCloseDialog}
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
        <DialogContent sx={{ minWidth: "500px", minHeight: "300px" }}>
          <PayPalButtons
            style={{ layout: "vertical" }}
            createOrder={createOrder}
            onApprove={onApprove}
            onError={onError}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
}
