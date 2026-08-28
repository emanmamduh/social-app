import React, { Children } from "react";
import { Navigate } from "react-router-dom";

export default function LoginProtect({ children }) {
  if (localStorage.getItem("userToken") !== "null") {
    return <Navigate to={"/home"}  />;
  } else {
    return children;
  }
}
// replace;