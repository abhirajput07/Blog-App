import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Sidebar from "./Sidebar";
import SidebarHeader from "./SidebarHeader";
function Dashboard() {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSideBar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Toaster />
      <div className="flex min-h-screen w-full">
        <Sidebar isOpen={isOpen} toggleSideBar={toggleSideBar} />
        <div
          className={`${
            isOpen ? "md:ml-48  ml-10" : "ml-19"
          } flex-1 duration-200 transition-all  w-full`}
        >
          <SidebarHeader />

          <Outlet />
        </div>
      </div>
    </>
  );
}
export default Dashboard;
