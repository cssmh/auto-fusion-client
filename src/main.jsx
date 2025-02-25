/* eslint-disable no-undef */
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Router from "./Shared/Router";
import AuthProvider from "./Shared/AuthProvider";
import { ToastContainer } from "react-toastify";
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={Router} />
      </AuthProvider>
    </QueryClientProvider>
    <ToastContainer
      position="top-center"
      autoClose={1500}
      hideProgressBar={true}
      closeOnClick={true}
      pauseOnHover={false}
      draggable={true}
      theme="colored"
    />
  </React.StrictMode>
);
