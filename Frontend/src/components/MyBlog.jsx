import React, { useEffect, useState } from "react";
import { getCookieData } from "../utils/helperFunction";
import axios from "axios";
import { serverURL } from "../server";

import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";

function MyBlog() {
  const [myBlogs, setMyBlogs] = useState([]);
  const [selectedBlogId, setSelectedBlogId] = useState(null);
  const cookieData = getCookieData(document.cookie);
  const userId = cookieData?.userId;

  const navigate = useNavigate();

  const getUserDetails = async () => {
    try {
      const response = await axios.post(
        `${serverURL}/blogs/getUserBlogs`,
        {
          userId: userId,
        },
        {
          headers: {
            Authorization: `Bearer ${cookieData?.authToken}`,
          },
        }
      );
      setMyBlogs(response?.data);
      console.log(response?.data);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteUserDetails = async (selectedBlogId) => {
    console.log(selectedBlogId);
    console.log(cookieData?.authToken);
    try {
      const response = await axios.delete(`${serverURL}/blogs/deleteBlog`, {
        headers: {
          Authorization: `Bearer ${cookieData?.authToken}`,
        },
        data: {
          blogId: selectedBlogId,
        },
      });
      getUserDetails();
      console.log(response);
      console.log("blog is deleted");
    } catch (error) {
      console.log("something is happend", error);
    }
  };
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = (blogId) => {
    setSelectedBlogId(blogId);
    setIsModalOpen(!isModalOpen);
  };
  console.log(selectedBlogId);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    getUserDetails();
  }, [userId]);

  return (
    <>
      {myBlogs.length > 0 ? (
        <p className="md:text-2xl sm:text-xl text-md font-bold  px-10 pt-5">
          Blogs
        </p>
      ) : (
        <p className="md:text-2xl sm:text-xl text-md font-bold  px-10 pt-5">
          Yet no blogs
        </p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 px-10 pt-5 relative">
        {isModalOpen && (
          <div className="overflow-y-auto bg-[#00000045] overflow-x-hidden fixed top-0 right-0 left-0 z-[999999] justify-center items-center w-full md:inset-0 h-screen max-h-full">
            <div className="relative flex justify-center p-4 w-full items-center h-full max-h-full">
              <div className=" bg-white rounded-lg shadow-sm relative">
                <button
                  type="button"
                  onClick={() => {
                    closeModal();
                  }}
                  className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
                <div className="p-4 md:p-5 text-center">
                  <svg
                    className="mx-auto mb-4 text-gray-400 w-12 h-12"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                  <h3 className="mb-5 text-lg font-normal text-gray-500">
                    Are you sure, you want to delete this Blog?
                  </h3>
                  <button
                    onClick={() => {
                      deleteUserDetails(selectedBlogId);
                      closeModal();
                    }}
                    type="button"
                    className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                  >
                    Yes, I'm sure
                  </button>
                  <button
                    onClick={closeModal}
                    type="button"
                    className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
                  >
                    No, cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {myBlogs.map((blog) => (
          <div
            key={blog._id}
            className="bg-white rounded-lg overflow-hidden flex flex-col shadow-2xl"
          >
            <img
              src={`${serverURL}/uploads/blogImage/${blog.blogImage}`}
              alt={blog.title}
              className="w-full h-48 object-cover rounded"
            />

            <div className=" flex flex-col flex-grow px-2">
              <p className="text-[15px] mt-1 text-blue-700">{blog.category}</p>
              <h2 className="text-xl font-bold text-gray-800">{blog.title}</h2>
              <div className="flex justify-between items-center py-2">
                <p className="text-gray-500 text-xs">
                  {new Date(blog.createdAt).toLocaleDateString()}
                </p>
                <button
                  onClick={() => navigate(`/blog`, { state: { data: blog } })}
                  type="button"
                  className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-1 focus:outline-none focus:ring-cyan-300  font-medium rounded-lg text-sm px-5 py-2 text-center "
                >
                  Read more
                </button>
              </div>
            </div>
            <div className="flex gap-2 px-3 py-1">
              <button
                className="text-2xl cursor-pointer"
                onClick={() =>
                  navigate(`/dashboard/update-blog`, { state: { data: blog } })
                }
              >
                <FaEdit />
              </button>
              <button
                className="text-3xl cursor-pointer text-red-600 "
                onClick={() => {
                  toggleModal(blog._id);
                }}
              >
                <MdDelete />
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default MyBlog;
