import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/home/Header.jsx";
import Footer from "../../components/home/Footer.jsx";

export default function Home() {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
