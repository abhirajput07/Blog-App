import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import Home from "./components/Home.jsx";
import About from "./components/About.jsx";
import Contact from "./components/Contact.jsx";
import Signin from "./components/Signin.jsx";
import Dashboard from "./components/Dashboard.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import AddBlog from "./components/AddBlog.jsx";
import UpdateProfile from "./components/UpdateProfile.jsx";
import MyBlog from "./components/MyBlog.jsx";
import MyComment from "./components/MyComment.jsx";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Blog from "./components/Blog.jsx";
import UpdateBlog from "./components/UpdateBlog.jsx";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient();
const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/blog", element: <Blog /> },
  { path: "/about", element: <About /> },
  { path: "/contact", element: <Contact /> },
  { path: "/signin", element: <Signin /> },

  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
    children: [
      { path: "/dashboard", element: <AddBlog /> },
      { path: "add-blog", element: <AddBlog /> },
      { path: "update-profile", element: <UpdateProfile /> },
      { path: "my-comment", element: <MyComment /> },
      { path: "my-blog", element: <MyBlog /> },
      { path: "update-blog", element: <UpdateBlog /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Toaster />
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </Provider>
);
