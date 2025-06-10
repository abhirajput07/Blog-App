import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { getCookieData } from "../utils/helperFunction";
import Blogs from "./Blogs";
import Blog from "./Blog";

function Home() {
  return (
    <>
      <Navbar />
      {/* <Blog/> */}
      <Blogs />
      <Footer />
    </>
  );
}

export default Home;
