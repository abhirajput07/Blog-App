import React from "react";
import Layout from "./Layout";
import { Navigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import Sidebar from "./Sidebar";
import AddBlog from "./AddBlog";
import { getCookieData } from "../utils/helperFunction";
function ProtectedRoute({ children }) {
  const cookie=getCookieData(document.cookie);
  const token = cookie?.authToken;
  return token ? children : <Navigate to={"/signin"} />;
}

export default ProtectedRoute;
