import React, { useEffect, useState } from "react";
import img from "../assets/BG1.jpg";
import Navbar from "../components/Navbar";
import { useLocation } from "react-router-dom";
import { serverURL } from "../server";
import Comments from "./Comments";
export default function Blog() {
  const [blogData, setBlogData] = useState({});
  const location = useLocation();

  function renderHTMLContent(htmlContent) {
    return (
      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    );
  }

  useEffect(() => {
    if (location?.state?.data) {
      setBlogData(location?.state?.data);
    }
  }, [location?.state?.data]);

  return (
    <>
      <Navbar />
      <div className="w-[80%] mx-auto  flex items-center justify-center flex-col mt-10 text-center">
        <div className="text-md font-bold text-blue-600">
          {blogData?.category}
        </div>
        <div className="text-4xl font-semibold p-2">{blogData?.title}</div>
        <div className="flex gap-3 items-center p-5 font-semibold">
          <img
            src={img}
            alt=""
            className="h-10 w-10 rounded-full object-cover"
          />
          <p>{blogData?.userId?.name}</p>
        </div>
        <div className="">
          <img
            src={`${serverURL}/uploads/blogImage/${blogData?.blogImage}`}
            alt=""
            className="rounded-lg object-cover"
          />
        </div>
        <div className=" pt-5 text-start">
          {renderHTMLContent(blogData?.description)}
        </div>
        <Comments blogId={blogData?._id} />
      </div>
    </>
  );
}
