import { createBrowserRouter } from "react-router";
import App from "../App.tsx";
import { Login } from "@/pages/Login.tsx";
import { ProtectedRoute } from "./ProtectedRoute.tsx";
import { Home } from "@/pages/Home.tsx";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      { path: "login", element: <Login /> },
      {
        element: <ProtectedRoute />,
        children: [{ index: true, element: <Home /> }],
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
