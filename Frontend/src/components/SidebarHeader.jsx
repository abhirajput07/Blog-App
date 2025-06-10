import React from "react";
import toast from "react-hot-toast";
import { IoIosLogOut } from "react-icons/io";
import { useNavigate } from "react-router-dom";

function SidebarHeader() {
  const navigate = useNavigate();

  function Handlelogout() {
    document.cookie.split(";").forEach((cookie) => {
      const trimmedCookie = cookie.trim();
      const name = trimmedCookie.split("=")[0];
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    });
    navigate("/");
    toast.success("logout successful");
  }
  return (
    <>
      <div className="h-16 w-full bg-gray-100 text-black flex justify-end pr-2 border-b border-gray-200">
        <div
          className={`flex items-center rounded px-1 cursor-pointer`}
          onClick={Handlelogout}
        >
          <IoIosLogOut className="text-3xl  " />
          <span className={`text-lg font-bold px-1`}>Logout</span>
        </div>
      </div>
    </>
  );
}

export default SidebarHeader;
