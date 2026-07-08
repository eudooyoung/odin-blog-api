import { createBrowserRouter } from "react-router";
import App from "../App.tsx";
import Home from "@/pages/home/Home.tsx";
import Login from "@/pages/login/Login.tsx";
import ProtectedRoute from "./ProtectedRoute.tsx";
import { Post } from "@/pages/post/Post.tsx";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      { path: "login", element: <Login /> },
      {
        element: <ProtectedRoute />,
        children: [
          { index: true, element: <Home /> },
          { path: "posts/:postId", element: <Post /> },
        ],
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
