import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";
import Login from "./pages/login/Login.jsx";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import SellerManagement from "./pages/SellerManagement.jsx";
import OrderManagement from "./pages/OrderManagement.jsx";
import CategoryManagement from "./pages/CategoryManagement.jsx";

function App() {
  const { user, mode } = useSelector((state) => state.auth);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  // const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Navigate to="/orders/all" />} />
            <Route
              path="/"
              element={user ? <Dashboard /> : <Navigate to="/login" />}
            >
              <Route path="seller-management" element={<SellerManagement />} />
              <Route path="orders/:status" element={<OrderManagement />} />
              <Route
                path="category-management"
                element={<CategoryManagement />}
              />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
