import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import toast, { ToastBar, Toaster } from "react-hot-toast";
import { serverURL } from "../server";
import axios from "axios";
import { FiUploadCloud } from "react-icons/fi";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import { getCookieData } from "../utils/helperFunction";

function AddBlog() {
  const navigate = useNavigate();

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

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [imagePreview, setImagePreview] = useState();
  const [dragging, setDragging] = useState(false);
  const fileInputRef = useRef(null);
  const [content, setContent] = useState("");
  const handleContentChange = (value) => {
    setContent(value);
    setValue("content", value);
    // Update react-hook-form's "content" field
  };

  const handleImagePreview = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      previewImage(file);
      setValue("image", file); // Update form state with image file
    }
  };

  const cookie = getCookieData(document.cookie);
  const token = cookie?.authToken;

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

  const onSubmit = async (data) => {
    console.log("Form Data Before Sending:", data);

    try {
      const id = cookie.userId;
      if (!id) {
        toast.error("User not found. Please log in again.");
        return;
      }

      const formData = new FormData();
      formData.append("userId", id);
      formData.append("title", data.title);
      formData.append("category", data.category);
      formData.append("description", data.content);

      if (data.image instanceof File) {
        formData.append("blogImage", data.image);
      } else {
        console.error("Image is not a File object!", data.image);
      }

      console.log("✅ FormData Entries Before Sending:");
      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }

      const response = await axios.post(
        `${serverURL}/blogs/addBlog/blogImage`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("✅ Server Response:", response.data);
      toast.success(response.data?.message);
      setImagePreview(null);
      setContent("");
      navigate("/");
    } catch (error) {
      console.error("🚨 Axios Error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };
  return (
    <>
      <div className="w-full h-auto flex justify-center items-center mt-[2%]">
        <div className="mx-auto p-3 bg-white rounded-lg w-full md:px-[10%] px-[5%]">
          <h2 className="md:text-2xl sm:text-xl text-md font-bold mb-4 text-start">
            📝 Add New Blog
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Blog Title */}
            <div>
              <label className="block font-semibold mb-1">Title:</label>
              <input
                type="text"
                placeholder="Enter Blog Title"
                {...register("title", { required: "Title is required" })}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.title && (
                <p className="text-red-500 text-sm">{errors.title.message}</p>
              )}
            </div>

            {/* Category Selection */}
            <div className="">
              <label className="block font-semibold mb-1">Category:</label>
              <select
                {...register("category", { required: "Category is required" })}
                className=" w-full md:max-w-[300px] md:h-1/2  p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Category</option>
                <option value="Tech">Tech</option>
                <option value="Lifestyle">Lifestyle</option>
                <option value="Education">Education</option>
                <option value="Health">Health</option>
              </select>
              {errors.category && (
                <p className="text-red-500 text-sm">
                  {errors.category.message}
                </p>
              )}
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
                  {...register("image")}
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
                value={content}
                modules={module}
                onChange={handleContentChange}
                className="bg-white rounded mb-4"
              />
              {errors.content && (
                <p className="text-red-500 text-sm">{errors.content.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="md:w-[20%] bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition font-semibold"
            >
              Publish Blog 🚀
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddBlog;
