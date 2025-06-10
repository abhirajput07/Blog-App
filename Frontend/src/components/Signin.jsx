import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { serverURL } from "../server";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useDispatch } from "react-redux";
import { fetchUser } from "../store/userSlice";

function Signin() {
  const [isLogin, setIsLogin] = useState(true);
  const navigation = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
const dispatch = useDispatch()

  const onSubmit = async (formData) => {
    try {
      const endPoint = isLogin ? "signin" : "signup";
      const { data } = await axios.post(
        `${serverURL}/auth/${endPoint}`,
        formData
      );

      if (endPoint === "signup") toast.success(data.message);

      if (isLogin) {
        navigation(`/`);
        document.cookie = `authToken=${data?.token}`;
        document.cookie = `userId=${data?.id}`;
        document.cookie = `name=${data?.name}`;
        toast.success("Login Successful");
      } else {
        setIsLogin(true);
      }

      reset();
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Something went wrong";
      toast.error(errorMessage);
    }
  };
  const toggleForm = () => {
    setIsLogin((prev) => {
      reset();
      return !prev;
    });
  };
  return (
    <>
      <Navbar />
      <Toaster />
      <div className="flex justify-center items-center min-h-screen bg-gray-400">
        <div className="border p-6 bg-white rounded md:w-96 w-80 shadow-lg mx-3">
          <h1 className="text-3xl font-bold mb-3 text-center">
            {isLogin ? "Login" : "Register"}
          </h1>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            {!isLogin && (
              <div>
                <label className="block text-gray-700">Name</label>
                <input
                  className="w-full border px-3 py-2 rounded-lg"
                  placeholder="Enter your name"
                  {...register("name", {
                    required: !isLogin && "Name is required",
                    pattern: {
                      value: /^[A-Za-z\s]+$/,
                      message: "Invalid name",
                    },
                  })}
                />
                {errors.name && (
                  <p className="text-red-600 text-sm">{errors.name.message}</p>
                )}
              </div>
            )}

            <div>
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2 border rounded-lg"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Invalid email format",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-600 text-sm">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full border px-3 py-2 rounded-lg"
                {...register("password", {
                  required: "Password is required",
                  pattern: {
                    value: isLogin
                      ? /^.{8,}$/
                      : /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message: "Invalid password",
                  },
                })}
              />
              {errors.password && (
                <p className="text-red-600">{errors.password.message}</p>
              )}
            </div>

            <button
              type="submit"
              className={`w-full mt-2 py-2 text-white ${
                isLogin ? "bg-blue-500" : "bg-green-500"
              } rounded-lg`}
            >
              {isLogin ? "Login" : "Register"}
            </button>
          </form>

          <p className="text-center text-sm mt-3">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button
              className="text-blue-500 px-2 hover:underline"
              onClick={toggleForm}
            >
              {isLogin ? "Create account" : "Login"}
            </button>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}
export default Signin;
