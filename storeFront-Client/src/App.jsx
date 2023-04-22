import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login.jsx";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import Cart from "./pages/Cart.jsx";
import Checkout from "./pages/Checkout.jsx";
import OrderConfirmationPage from "./pages/OrderConfirmationPage.jsx";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import AllOrder from "./pages/AllOrder.jsx";
import AddToCart from "./pages/AddToCart.jsx";

function App() {
  const { user, mode } = useSelector((state) => state.auth);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  // const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <PayPalScriptProvider
            options={{
              "client-id":
                "AVsX-QxVpm1-JdwSRbgYlqkOY29iQb4RF4mvHF0lLtVDqU29s39RV-Y0UhnM8ekNqDW4LBB-j2gXo16s",
            }}
          >
            <CssBaseline />
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route
                path="/"
                element={user ? <AddToCart /> : <Navigate to="/login" />}
              />
              <Route
                path="/checkout"
                element={user ? <Checkout /> : <Navigate to="/login" />}
              />
              <Route
                path="/order-confirmation/:orderID"
                element={
                  user ? <OrderConfirmationPage /> : <Navigate to="/login" />
                }
              />
              <Route
                path="/profile/cart"
                element={user ? <Cart /> : <Navigate to="/login" />}
              />
              <Route
                path="/profile/orders"
                element={user ? <AllOrder /> : <Navigate to="/login" />}
              />
              {/* <Route path="orders/*" element={<OrderManagement />} /> */}
            </Routes>
          </PayPalScriptProvider>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
