import React from "react";
import Navbar from "../Components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../Components/Footer/Footer";

export default function Layouts() {
  return (
    <>
      <Navbar />
      {/* <div className="relative"> */}
        <Outlet />
      {/* </div> */}
      {/* <Footer/> */}
    </>
  );
}
