import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "./scenes/homePage";
import LoginPage from "./scenes/loginPage";
import ProfilePage from "./scenes/profilePage";
import AddAProduct from "./scenes/addAProduct";
import AllProducts from "./scenes/allProducts";
import EditProduct from "./scenes/editProduct";
import EditProfile from "./scenes/editProfile";
import ChangePassword from "./scenes/changePassword";

import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material";
import { themeSettings } from "./theme";
import state from "./state";

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <div className="App">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route
              path="/home"
              element={isAuth ? <HomePage /> : <Navigate to="/" />}
            />
            <Route
              path="/profile/:userID"
              element={isAuth ? <ProfilePage /> : <Navigate to="/" />}
            />
            <Route
              path="/products/add"
              element={isAuth ? <AddAProduct /> : <Navigate to="/" />}
            />

            <Route
              path="/products/all/:userID"
              element={isAuth ? <AllProducts /> : <Navigate to="/" />}
            />

            <Route
              path="/products/update/:productID"
              element={isAuth ? <EditProduct /> : <Navigate to="/" />}
            />

            <Route
              path="/profile"
              element={!isAuth ? <Navigate to="/" /> : <Navigate to="/" />}
            />
            <Route
              path="/profile/edit/:userID"
              element={isAuth ? <EditProfile /> : <Navigate to="/" />}
            />
            <Route
              path="/profile/edit/changePassword/:userID"
              element={isAuth ? <ChangePassword /> : <Navigate to="/" />}
            />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
