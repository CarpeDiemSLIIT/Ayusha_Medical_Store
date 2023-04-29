import { useEffect } from "react";
import authService from "../features/auth/authService.js";
import { useNavigate } from "react-router-dom";
const DefaultAdmin = () => {
  const navigate = useNavigate();
  useEffect(() => {
    authService.createDefaultAdmin();
    navigate("/login");
  }, []);
  return <div></div>;
};

export default DefaultAdmin;
