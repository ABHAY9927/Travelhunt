import React from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Layout = ({ children }) => {
  return (
    <div>
      {/* Other layout components */}
      {children}
      <ToastContainer />
    </div>
  );
};

export default Layout;
