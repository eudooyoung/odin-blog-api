import { createBrowserRouter } from "react-router";
import App from "../App.tsx";
import Home from "@/pages/home/Home.tsx";
import Login from "@/pages/login/Login.tsx";
import Signup from "@/pages/signup/Signup.tsx";
import ProtectedRoute from "./ProtectedRoute.tsx";
import Profile from "@/pages/profile/Profile.tsx";
import { Post } from "@/pages/post/Post.tsx";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
      { path: "posts/:postId", element: <Post /> },
      {
        element: <ProtectedRoute />,
        children: [{ path: "profile", element: <Profile /> }],
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
