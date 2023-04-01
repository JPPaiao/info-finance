import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { ErrorPage } from "./routes/error"
import { Register } from "./routes/register"
import { Dashboard, loaderDashboard } from "./routes/dashboard"
import { actionLogin, Login } from "./routes/login"
import { AuthProvider } from "./context/authProvider"
import "./index.css"

const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />,
        errorElement: <ErrorPage />,
        action: actionLogin
    },
    {
        path: "/register",
        element: <Register />,
        errorElement: <ErrorPage />
    },
    {
        path: "/dashboard",
        element: <Dashboard />,
        errorElement: <ErrorPage />,
        loader: loaderDashboard,
    }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <AuthProvider>
        <RouterProvider router={router} />
    </AuthProvider>
);
