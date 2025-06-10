import React, { useEffect, useState } from "react";
import logo from "../assets/BG1.jpg";
import axios from "axios";
import { serverURL } from "../server";
import { getCookieData } from "../utils/helperFunction";
import toast, { Toaster } from "react-hot-toast";
import { CgLayoutGrid } from "react-icons/cg";
const UpdateProfile = () => {
  const [userData, setUserData] = useState({});
  const [updatedData, setUpdatedData] = useState({
    name: "",
    email: "",
    profileImage: "",
  });
  const cookieData = getCookieData(document.cookie);
  const userId = cookieData?.userId;

  // functions to get user previous Details
  const getUserDetails = async () => {
    try {
      const response = await axios.post(`${serverURL}/auth/get-user-profile`, {
        userId: userId,
      });
      setUserData(response?.data?.profile);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, [userId]);

  // filter data from backend or previous data to make it updatable
  const transformData = (previousDetailObject) => {
    return {
      name: previousDetailObject.name,
      email: previousDetailObject.email,
      profileImage: previousDetailObject.profileImage,
    };
  };

  useEffect(() => {
    if (Object.entries(userData).length > 0) {
      const transformedData = transformData(userData);
      setUpdatedData(transformedData);
    }
  }, [userData]);

  // function to update the data of the user
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("name", updatedData.name);
    formData.append("email", updatedData.email);
    if (typeof updatedData.profileImage !== "string") {
      formData.append("profileImage", updatedData.profileImage);
    }
    try {
      const response = await axios.put(
        `${serverURL}/auth/update-profile/profileImage`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${cookieData?.authToken}`,
          },
        }
      );
      toast.success(response?.data?.message);
      if (response) {
        getUserDetails();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <Toaster />
      <div className="w-full h-auto flex justify-center items-center mt-[2%]">
        <div className="mx-auto p-3 bg-white rounded-lg w-full md:px-[10%] px-[5%]">
          <h2 className="md:text-2xl sm:text-xl text-md font-bold mb-4 ">
            📝 Update Profile
          </h2>

          <form onSubmit={(e) => handleUpdateProfile(e)} className="space-y-4">
            <label
              className="block mb-2 text-sm font-medium text-gray-900"
              htmlFor="file_input"
            >
              Upload file
            </label>
            <div className="flex gap-2">
              <img
                // src={
                //   updatedData?.profileImage
                //     ? `${serverURL}/uploads/profileImage/${updatedData?.profileImage}`
                //     : logo
                // }
                src={
                  updatedData?.profileImage &&
                  typeof updatedData.profileImage !== "string"
                    ? URL.createObjectURL(updatedData.profileImage)
                    : updatedData?.profileImage
                    ? `${serverURL}/uploads/profileImage/${updatedData.profileImage}`
                    : logo
                }
                alt=""
                className="w-12 h-12 rounded-full"
              />
              <input
                name="profileImage"
                onChange={(e) =>
                  setUpdatedData({
                    ...updatedData,
                    profileImage: e.target.files[0],
                  })
                }
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50  focus:outline-none  p-3"
                aria-describedby="file_input_help"
                id="file_input"
                type="file"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Name:</label>
              <input
                type="text"
                name="name"
                value={updatedData.name}
                onChange={(e) =>
                  setUpdatedData({ ...updatedData, name: e.target.value })
                }
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Email:</label>
              <input
                type="email"
                placeholder=""
                value={updatedData.email}
                onChange={(e) =>
                  setUpdatedData({ ...updatedData, email: e.target.value })
                }
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:ring-blue-300 font-medium rounded-lg text-sm px-8 py-2.5 me-2 mb-2  focus:outline-none "
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateProfile;
