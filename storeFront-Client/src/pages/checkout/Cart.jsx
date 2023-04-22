import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyCart, reset } from "../../features/cart/cartSlice";
import {
  Backdrop,
  Box,
  Button,
  Card,
  CircularProgress,
  Typography,
  useTheme,
} from "@mui/material";
import CartItemsTable from "../../components/CartItemsTable.jsx";
import FlexBetween from "../../components/customMUI/FlexBetween.jsx";
import { useNavigate } from "react-router";
export default function Cart() {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const navigate = useNavigate();
  const [shippingCost, setShippingCost] = useState(2);

  const { cart, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.cart
  );

  useEffect(() => {
    dispatch(getMyCart());
    return () => {
      dispatch(reset());
    };
  }, []);

  if (isLoading) {
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
      <Typography variant="h1" color="initial">
        Cart
      </Typography>
      {isLoading ? (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : cart && Array.isArray(cart.cartItems) && cart.cartItems.length > 0 ? (
        <FlexBetween gap="2rem">
          <Box width="70%">
            <CartItemsTable
              items={cart.cartItems}
              total={cart.total}
              options={true}
            />
          </Box>
          <Card sx={{ minWidth: "30%", padding: "1rem" }}>
            <Box width="100%" gap="2rem" display="flex" flexDirection="column">
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
                  color: palette.background.alt,
                  "&:hover": { color: palette.primary.main },
                }}
                onClick={() => {
                  navigate("/checkout");
                }}
              >
                Checkout
              </Button>
            </Box>
          </Card>
        </FlexBetween>
      ) : (
        "No items in cart"
      )}
    </div>
  );
}
