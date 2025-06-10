import React, { useEffect, useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { serverURL } from "../server";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import Loader from "./Loader";

const Blogs = () => {
  const [searchParams, setSearchParams] = useSearchParams({ page: 1 });
  const [debounce, setDebounce] = useState("");
  const q = searchParams.get("q") || "";
  const category = searchParams.get("category") || "";
  const page = parseInt(searchParams.get("page")) || 1;

  useEffect(() => {
    let timerId = setTimeout(() => {
      setDebounce(q);
    }, 500);
    return () => clearTimeout(timerId);
  }, [q]);

  const fetchBlogs = async (page) => {
    const { data } = await axios.get(
      `${serverURL}/blogs/getBlogs?page=${page}${
        debounce ? `&q=${debounce}` : ""
      }&category=${category}`
    );
    return data;
  };

  const navigate = useNavigate();
  const {
    data: blogData,
    isLoading,
    isError,
    isFetching,
  } = useQuery({
    queryKey: ["blogs", page, debounce, category],
    queryFn: () => fetchBlogs(page),
    staleTime: 10000,
    placeholderData: keepPreviousData,
  });

  const blogs = blogData?.blogs || [];
  const totalPages = blogData?.totalPages || 1;

  const handleMove = (curr) => {
    setSearchParams((prev) => {
      prev.set("page", Math.max(page + curr, 1));
      return prev;
    });
  };

  // if (isLoading) return <p className="text-center py-4">Loading blogs...</p>;
  if (isLoading) return <Loader />;
  // if (isError)
  //   return (
  //     <p className="text-center py-4 text-red-500">Error: {error.message}</p>
  //   );

  return (
    <div className="max-w-screen-xl md:mx-[5%] mx-[3%] px-4 py-8">
      <>
        <div className="flex w-full justify-between gap-3 md:px-[10%]">
          <div className="mb-4 w-[100%] border rounded-md flex items-center px-3">
            <CiSearch className="text-xl" />
            <input
              type="text"
              placeholder="Search blogs..."
              className="p-2  w-full outline-none"
              onChange={(e) => {
                setSearchParams((prev) => {
                  prev.set("q", e.target.value);
                  prev.set("category", "");
                  prev.set("page", 1);
                  return prev;
                });
              }}
            />
          </div>
          <div className="mb-4 w-1/2 h-5">
            <select
              className="p-2 border rounded-md w-full outline-none"
              onChange={(e) => {
                setSearchParams((prev) => {
                  prev.set("category", e.target.value);
                  prev.set("page", 1);
                });
              }}
            >
              <option selected value="">
                Category
              </option>
              <option value="Tech">Tech</option>
              <option value="Lifestyle">Lifestyle</option>
              <option value="Education">Education</option>
              <option value="Health">Health</option>
            </select>
          </div>
        </div>
      </>

      {isFetching && <Loader />}
      {isError && <div className="w-full text-2xl font-bold text-center">
      No blog exists
      </div>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog) => (
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
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center mt-6">
        <button
          disabled={page <= 1}
          className={`flex items-center gap-2 px-5 py-1 rounded-lg font-medium transition-all duration-300 ease-in-out ${
            page <= 1
              ? "bg-gray-300 text-gray-400 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
          onClick={() => handleMove(-page)}
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Prev
        </button>

        <button
          disabled={page >= totalPages}
          onClick={() => handleMove(page)}
          className={`flex items-center gap-2 px-5 py-1 rounded-lg font-medium transition-all duration-300 ease-in-out ${
            page >= totalPages
              ? "bg-gray-300 text-gray-400 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          Next
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Blogs;
