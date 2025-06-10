import React, { useState } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { serverURL } from "../server";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${serverURL}/contact/addQuery`,
        formData
      );
      toast.success(response?.data?.message);
      console.log(response);
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.log(error);
      const errorMessage = error?.response?.data?.message || error.message;
      toast.error(errorMessage);
    }
  };

  return (
    <>
      <Toaster />
      <Navbar />
      <div className="max-w-6xl mx-auto px-5 py-10">
        <div className="grid md:grid-cols-2 gap-5 items-start bg-white shadow-lg rounded-lg p-3">
          <div>
            <h1 className="text-4xl font-bold text-blue-700 mb-4">
              Contact Us
            </h1>
            <p className="text-gray-600 mb-8">
              Have a question, feedback, or just want to connect? We'd love to
              hear from you!
            </p>

            <div className="space-y-4 text-gray-600">
              <div className="flex items-center gap-2">
                <span>📧</span>
                <span>contact@yourblog.com</span>
              </div>
              <div className="flex items-center gap-2">
                <span>📞</span>
                <span>+91 9876543210</span>
              </div>
              <div className="flex items-center gap-2">
                <span>📍</span>
                <span>India – sharing knowledge worldwide</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="bg-white md:p-5 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Your Name
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Your Message
              </label>
              <textarea
                name="message"
                rows="5"
                required
                value={formData.message}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
                placeholder="Write your message here..."
              />
            </div>

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Contact;
