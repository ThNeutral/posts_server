import React from "react";
import ReactDOM from "react-dom/client";
import "./main.scss";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Wrapper from "./components/Wrapper/Wrapper";
import SignUpPage from "./components/SignUpPage/SIgnUpPage";
import LoginPage from "./components/LoginPage/LoginPage";

export const AuthProvider = React.createContext("");

const router = createBrowserRouter([
  {
    path: "/",
    element: <Wrapper />,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/sign-up",
        element: <SignUpPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
