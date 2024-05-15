import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./styles.css";
import { router } from "./router";
import { PostLoading } from "./PostLoading";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} fallbackElement={<PostLoading />} />
  </React.StrictMode>
);
