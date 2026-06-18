import { createBrowserRouter } from "react-router";
import App from "../App.tsx";
import Home from "@/pages/Home.tsx";
import Login from "@/pages/Login.tsx";
import Signup from "@/pages/Signup.tsx";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
