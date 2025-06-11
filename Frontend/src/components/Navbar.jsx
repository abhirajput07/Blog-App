import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import profileIcon from "../assets/react.svg";
import { getCookieData, handleLogout } from "../utils/helperFunction";
import { serverURL } from "../server";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../store/userSlice";
function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [dropDownMenu, setdropDownMenu] = useState(false);
  const cookieData = getCookieData(document.cookie);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogoutUser = () => {
    setdropDownMenu(false);
    handleLogout();
    navigate("/");
  };

  const userProfile = useSelector((state) => state.user.data);

  useEffect(() => {
    if (cookieData?.authToken) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [cookieData]);

  useEffect(() => {
    if (cookieData?.userId) {
      dispatch(fetchUser(cookieData?.userId));
    }
  }, [cookieData?.userId, dispatch]);

  // const userId = cookieData?.userId;

  // // functions to get user previous Details
  // const getUserDetails = async () => {
  //   try {
  //     const response = await axios.post(`${serverURL}/auth/get-user-profile`, {
  //       userId: userId,
  //     });
  //     setUserData(response?.data?.profile);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   getUserDetails();
  // }, [userId]);
  return (
    <>
      <nav className="  bg-gray-200 shadow-md ">
        <div className="flex justify-between items-center py-4 px-6 md:px-20 ">
          <div className="text-2xl font-bold">
            <Link to="/" className="text">
              Blogify
            </Link>
          </div>

          <ul className="hidden md:flex gap-6 text-lg  items-center ">
            <li className="relative">
              <NavLink
                to="/"
                className={`after:absolute after:left-0 after:bottom-0 after:w-0 after:h-1 
                after:bg-black after:transition-all after:duration-200 hover:after:w-full after:rounded-full font-semibold`}
              >
                Home
              </NavLink>
            </li>
            <li className="relative">
              <NavLink
                to="/about"
                className={`after:absolute after:left-0 after:bottom-0 after:w-0 after:h-1 
                after:bg-black after:transition-all after:duration-200 hover:after:w-full after:rounded-full font-semibold`}
              >
                About
              </NavLink>
            </li>
            <li className="relative">
              <NavLink
                to="/contact"
                className={`after:absolute after:left-0 after:bottom-0 after:w-0 after:h-1 
                after:bg-black after:transition-all after:duration-200 hover:after:w-full after:rounded-full font-semibold`}
              >
                Contact
              </NavLink>
            </li>
            {isLogin ? (
              <div className="">
                <div
                  className="flex gap-1 justify-center items-center cursor-pointer"
                  onClick={() => {
                    setdropDownMenu(!dropDownMenu);
                  }}
                >
                  <div className=" flex gap-2 justify-center  text-nowrap">
                    <img
                      className="rounded-full w-10 h-10 object-cover"
                      src={
                        userProfile?.profileImage
                          ? `${serverURL}/uploads/profileImage/${userProfile?.profileImage}`
                          : profileIcon
                      }
                      alt=""
                    />
                  </div>
                  <div>
                    <p>{userProfile?.name}</p>
                  </div>
                </div>
                {dropDownMenu && (
                  <div className="absolute top-18 right-22 px-3 py-1 bg-white rounded-lg shadow-lg text-lg ">
                    <ul className="space-y-1 flex flex-col items-start w-28 text-[16px]">
                      <li className=" hover:bg-gray-200 hover:px-1 hover:py-1 hover:rounded-lg transition-all duration-200">
                        <NavLink to={"/dashboard"} className=" px-3">
                          Dashboard
                        </NavLink>
                      </li>
                      <li
                        onClick={handleLogoutUser}
                        className="hover:bg-gray-200 hover:px-1 hover:py-1 hover:pr-8 hover:rounded-lg transition-all duration-200"
                      >
                        <NavLink className="px-3">Logout</NavLink>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <li className="relative">
                <NavLink
                  to="/signin"
                  className={`after:absolute after:left-0 after:bottom-0 after:w-0 after:h-1 
                after:bg-black after:transition-all after:duration-200 hover:after:w-full after:rounded-full font-semibold`}
                >
                  Sign In
                </NavLink>
              </li>
            )}

            {/* <li className="relative">
                <NavLink
                  to=""
                  className={`after:absolute after:left-0 after:bottom-0 after:w-0 after:h-1 
                after:bg-black after:transition-all after:duration-200 hover:after:w-full after:rounded-full`}
                >
                  Sign In
                </NavLink>
              </li> */}
          </ul>

          <div className="md:hidden flex gap-2">
            <div>
              <button onClick={() => setMenuOpen(!menuOpen)}>
                {menuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
              </button>
            </div>
            <div>
              <div className=" relative">
                <div
                  className="flex gap-1 justify-center cursor-pointer"
                  onClick={() => {
                    setdropDownMenu(!dropDownMenu);
                  }}
                >
                  {isLogin && (
                    <div className="w-8">
                      <img src={profileIcon} alt="" />
                    </div>
                  )}
                </div>
                {dropDownMenu && (
                  <div className="absolute top-14 right-2 py-1 px-3 bg-white rounded shadow-lg text-sm">
                    <ul className="space-y-1 flex flex-col items-start w-26 text-[16px]">
                      <li className=" hover:bg-gray-200 hover:px-1 hover:py-1 hover:rounded-lg transition-all duration-200">
                        <NavLink to={"/dashboard"} className=" px-2">
                          Dashboard
                        </NavLink>
                      </li>
                      <li
                        onClick={handleLogoutUser}
                        className="hover:bg-gray-200 hover:px-1 hover:py-1 hover:pr-6 hover:rounded-lg transition-all duration-200"
                      >
                        <NavLink className="px-3">Logout</NavLink>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <ul className="absolute top-18 left-1/2 transform -translate-x-1/2 rounded w-[90%] mx-auto bg-white shadow-md text-center py-2 transition-all duration-200 ">
            <li>
              <NavLink
                to="/"
                className="block py-1 text-lg hover:text-blue-600 font-semibold"
                onClick={() => setMenuOpen(false)}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className="block py-1 text-lg hover:text-blue-600 font-semibold"
                onClick={() => setMenuOpen(false)}
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className="block py-1 text-lg hover:text-blue-600 font-semibold"
                onClick={() => setMenuOpen(false)}
              >
                Contact
              </NavLink>
            </li>
            {!isLogin && (
              <li>
                <NavLink
                  to="/signin"
                  className="block py-1 text-lg hover:text-blue-600"
                  onClick={() => setMenuOpen(false)}
                >
                  Sign In
                </NavLink>
              </li>
            )}
          </ul>
        )}
      </nav>
    </>
  );
}

export default Navbar;
