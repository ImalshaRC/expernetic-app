import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import SideBar from "./pages/sidebar/Sidebar";
import Navbar from "./pages/navbar/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import ListTodo, { loader as ListTodoLoader } from "./pages/ListTodo";
import AddTodo, { action as AddTodoAction } from "./pages/AddTodo";
import UpdateTodo from "./pages/UpdateTodo";
import Register, { action as RegisterAction } from "./pages/auth/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/auth/Login";
import { AuthProvider } from "./context/AuthProvider";
import ErrorPage from "./pages/error-page";

const AppLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <SideBar />,
        children: [
          {
            errorElement: <ErrorPage />,
            children: [
              {
                path: "add",
                element: <AddTodo />,
                action: AddTodoAction,
              },
              {
                path: "list",
                element: <ListTodo />,
                loader: ListTodoLoader,
              },
              {
                path: "edit/:id",
                element: <UpdateTodo />,
              },
            ],
          },
        ],
      },
      {
        path: "register",
        element: <Register />,
        action: RegisterAction,
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
]);

const rootElement = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

rootElement.render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
      <ToastContainer position="top-right" />
    </AuthProvider>
  </React.StrictMode>
);
