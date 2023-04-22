import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login.jsx";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
//pages
//home
import Home from "./pages/home/Home.jsx";
import Catalog from "./pages/home/Catalog.jsx";
import Product from "./pages/home/Product.jsx";
import Profile from "./pages/home/Profile.jsx";
import ProfileView from "./pages/home/ProfileView.jsx";

//checkout things
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import Cart from "./pages/checkout/Cart.jsx";
import Checkout from "./pages/checkout/Checkout.jsx";
import OrderConfirmationPage from "./pages/checkout/OrderConfirmationPage.jsx";
import AllOrder from "./pages/checkout/AllOrder.jsx";

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
                path="/checkout"
                element={user ? <Checkout /> : <Navigate to="/login" />}
              />
              <Route
                path="/order-confirmation/:orderID"
                element={
                  user ? <OrderConfirmationPage /> : <Navigate to="/login" />
                }
              />
              <Route path="/" element={<Home />}>
                <Route path="/" element={<Catalog />} />
                <Route
                  path="product/:productID"
                  element={user ? <Product /> : <Navigate to="/login" />}
                />
                <Route path="/profile" element={<Profile />}>
                  <Route
                    path="my"
                    element={user ? <ProfileView /> : <Navigate to="/login" />}
                  />
                  <Route
                    path="cart"
                    element={user ? <Cart /> : <Navigate to="/login" />}
                  />
                  <Route
                    path="orders"
                    element={user ? <AllOrder /> : <Navigate to="/login" />}
                  />
                </Route>
              </Route>
              {/* profile page  */}

              {/* <Route path="orders/*" element={<OrderManagement />} /> */}
            </Routes>
          </PayPalScriptProvider>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
