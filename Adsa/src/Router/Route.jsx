import { createBrowserRouter } from "react-router-dom";

import Layout from "../components/Layout/Layout";
import Home from "../pages/Home/Home";
import Blog from "../pages/Blog/Blog";
import About from "../pages/About/About";
import NotFound from "../pages/NotFound/NotFound";
import BlogPostDetails from "../pages/Blog/BlogPostDetails";

let route = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "/blog", element: <Blog /> },
      { path: "/about", element: <About /> },
      { path: "/blog/:slug", element: <BlogPostDetails /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default route;
