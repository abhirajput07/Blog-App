import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { FiUploadCloud } from "react-icons/fi";
import ReactQuill from "react-quill";
import { useLocation } from "react-router-dom";
import { getCookieData } from "../utils/helperFunction";
import { serverURL } from "../server";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

export default function UpdateBlog() {
  const [blogData, setBlogData] = useState({
    blogId: "",
  });
  const [updatedData, setUpdatedData] = useState({
    title: "",
    category: "",
    description: "",
    blogImage: "",
  });
  const transformData = (previousDetailObject) => {
    return {
      title: previousDetailObject.title,
      category: previousDetailObject.category,
      description: previousDetailObject.description,
      blogImage: previousDetailObject.blogImage,
    };
  };

  const location = useLocation();

  useEffect(() => {
    if (location?.state?.data) {
      console.log(location?.state?.data);
      setBlogData(location?.state?.data);
    }
  }, []);

  useEffect(() => {
    if (Object.entries(blogData).length > 0) {
      const transformedData = transformData(blogData);
      console.log("blogData", blogData);
      console.log("transformedata", transformedData);
      setUpdatedData(transformedData);
      if (transformedData.blogImage) {
        if (typeof transformedData.blogImage === "string") {
          setImagePreview(
            `${serverURL}/uploads/blogImage/${transformedData.blogImage}`
          );
        } else {
          previewImage(transformedData.blogImage); // In case it's a File object (when replacing)
        }
      }
    }
  }, [blogData]);

  const toolbarOptions = [
    ["bold", "italic", "underline"], // toggled buttons
    ["blockquote", "code-block"],
    ["link", "image", "video"],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ align: [] }],

    ["clean"], // remove formatting button
  ];

  const module = {
    toolbar: toolbarOptions,
  };
  const [imagePreview, setImagePreview] = useState(
    location?.state?.data?.blogImage
      ? `${serverURL}/uploads/blogImage/${location?.state?.data?.blogImage}`
      : null
  );
  const [dragging, setDragging] = useState(false);
  const fileInputRef = useRef(null);
  //   const [content, setContent] = useState("");
  //   const handleContentChange = (value) => {
  //     setContent(value);
  //     setValue("content", value);
  //     // Update react-hook-form's "content" field
  //   };

  const handleImagePreview = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      previewImage(file);
      setUpdatedData({ ...updatedData, blogImage: file });
    }
  };
  const cookieData = getCookieData(document.cookie);

  const previewImage = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      previewImage(file);
      setValue("image", file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    console.log(updatedData);

    const formData = new FormData();
    formData.append("blogId", blogData?._id);
    formData.append("title", updatedData.title);
    formData.append("category", updatedData.category);
    formData.append("description", updatedData.description);
    if (typeof updatedData.blogImage !== "string") {
      formData.append("blogImage", updatedData.blogImage);
    }
    try {
      const response = await axios.put(
        `${serverURL}/blogs/updateBlog/blogImage`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${cookieData?.authToken}`,
          },
        }
      );
      toast.success(response?.data?.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleUpdateDescription = (value) => {
    setUpdatedData({ ...updatedData, description: value });
  };

  return (
    <>
      <Toaster />
      <div className="w-full h-auto flex justify-center items-center mt-[2%]">
        <div className="mx-auto p-3 bg-white rounded-lg w-full md:px-[10%] px-[5%]">
          <h2 className="md:text-2xl sm:text-xl text-md font-bold mb-4 text-start">
            📝 Update you blog
          </h2>

          <form
            onSubmit={(e) => {
              handleUpdateProfile(e);
            }}
            className="space-y-4"
          >
            {/* Blog Title */}
            <div>
              <label className="block font-semibold mb-1">Title:</label>
              <input
                type="text"
                placeholder="Enter Blog Title"
                value={updatedData?.title}
                onChange={(e) =>
                  setUpdatedData({ ...updatedData, title: e.target.value })
                }
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Category Selection */}
            <div className="">
              <label className="block font-semibold mb-1">Category:</label>
              <select
                className="w-auto min-w-xs p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={updatedData.category}
                onChange={(e) =>
                  setUpdatedData({ ...updatedData, category: e.target.value })
                }
              >
                <option value="">Select Category</option>
                <option value="Tech">Tech</option>
                <option value="Lifestyle">Lifestyle</option>
                <option value="Education">Education</option>
                <option value="Health">Health</option>
              </select>
            </div>

            {/* Drag & Drop + Click to Upload Image */}
            <div>
              <label className="block font-semibold mb-1">Upload Image:</label>
              <div
                className={`md:max-w-[300px] md:h-1/2 border-2 border-dashed p-4 border-gray-300 rounded-lg text-center cursor-pointer  ${
                  dragging ? "border-blue-500 bg-gray-100" : "border-gray-300"
                }`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onClick={handleImageClick} // Click to select image
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImagePreview}
                  ref={fileInputRef}
                  className="hidden"
                />
                {imagePreview ? (
                  <label className="block cursor-pointer">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-40 object-cover rounded"
                    />
                    <p className="text-sm text-gray-500 mt-2">
                      Click to change image
                    </p>
                  </label>
                ) : (
                  <label className=" cursor-pointer flex justify-center flex-col items-center">
                    <FiUploadCloud className="text-7xl" />
                    <p className="text-gray-600">
                      Drag & Drop an Image here, or click to select
                    </p>
                  </label>
                )}
              </div>
            </div>

            {/* Blog Content */}
            <div>
              <label className="block font-semibold mb-1">Content:</label>
              <ReactQuill
                theme="snow"
                modules={module}
                value={updatedData.description}
                onChange={handleUpdateDescription}
                className="bg-white rounded mb-4"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="md:w-[20%] bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition font-semibold"
            >
              Update Blog 🚀
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
