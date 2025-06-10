import React, { useEffect, useState } from "react";
import { TbBrandBlogger } from "react-icons/tb";
import { IoIosAddCircle } from "react-icons/io";
import { FaCommentDots } from "react-icons/fa";
import { MdLocalPostOffice } from "react-icons/md";
import { MdOutlineTipsAndUpdates } from "react-icons/md";
import { MdOutlineCancel } from "react-icons/md";
import { IoMenu } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { FiHome } from "react-icons/fi";
function Sidebar({ isOpen, toggleSideBar }) {
  return (
    <>
      {" "}
      <div
        className={`z-10000 bg-blue-900 text-white flex flex-col justify-between h-full fixed top-0 left-0 p-3 ${
          isOpen ? "w-48 items-start" : "md:w-18 "
        } duration-300`}
      >
        <div
          className={`${
            isOpen
              ? ""
              : "flex items-center justify-between flex-col duration-300"
          }`}
        >
          {/* logo */}
          <div className="">
            <div>
              <Link to={"/"} className="flex justify-center items-center gap-1">
                <div>
                  <TbBrandBlogger className="md:text-6xl text-5xl" />
                </div>
                <div>
                  <span
                    className={`text-2xl font-bold ${isOpen ? "" : "hidden"}`}
                  >
                    Blogify
                  </span>
                </div>
              </Link>
            </div>
          </div>

          {/* menulist */}
          <nav className="mt-10">
            <ul className="text-md flex flex-col gap-6">
              <li className="">
                <Link
                  to="/"
                  className={`flex items-center gap-3 ${
                    isOpen ? "" : "justify-center"
                  } hover:text-gray-200 `}
                >
                  <FiHome className="md:text-3xl text-2xl" />
                  <span className={`${isOpen ? "" : "hidden"}`}>Home</span>
                </Link>
              </li>
              <li className="" >
                <Link
                  to="/dashboard/add-blog"
                  className={`flex items-center gap-3 ${
                    isOpen ? "" : "justify-center"
                  } hover:text-gray-200 `}
                  
                >
                  <IoIosAddCircle className="md:text-3xl text-2xl" />
                  <span className={`${isOpen ? "" : "hidden"}`}>AddBlog</span>
                </Link>
              </li>
              <li className="">
                <Link
                  to="/dashboard/update-profile"
                  className={`flex items-center gap-3 hover:text-gray-200 ${
                    isOpen ? "" : "justify-center"
                  }`}
                >
                  <MdOutlineTipsAndUpdates className="md:text-3xl text-2xl" />
                  <span className={`${isOpen ? "" : "hidden"}`}>
                    UpdateProfile
                  </span>
                </Link>
              </li>
              <li className="">
                <Link
                  to={"/dashboard/my-comment"}
                  className={`flex items-center gap-3 hover:text-gray-200 ${
                    isOpen ? "" : "justify-center"
                  }`}
                >
                  <FaCommentDots className="md:text-3xl text-2xl" />
                  <span className={`${isOpen ? "" : "hidden"}`}>
                    MyComments
                  </span>
                </Link>
              </li>
              <li className="">
                <Link
                  to={"/dashboard/my-blog"}
                  className={`flex items-center gap-3 hover:text-gray-200 ${
                    isOpen ? "" : "justify-center"
                  }`}
                >
                  <MdLocalPostOffice className="md:text-3xl text-2xl" />
                  <span className={`${isOpen ? "" : "hidden"}`}>MyBlogs</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        {/* togglebtn */}
        <div
          className={`text-3xl flex w-full items-center gap-2 ${
            isOpen ? "gap-6 justify-end" : "justify-center flex-col"
          }`}
        >
          <div
            className={` cursor-pointer flex   hover:bg-gray-800 rounded text-3xl ${
              isOpen ? "order-2 " : "px-1  "
            } `}
            onClick={toggleSideBar}
          >
            {isOpen ? (
              <MdOutlineCancel className=" hover:text-gray-200 " />
            ) : (
              <IoMenu className="hover:text-gray-200" />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
