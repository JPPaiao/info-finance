import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { ErrorPage } from "./routes/error"
import { Register } from "./routes/register"
import { Dashboard, loaderDashboard } from "./routes/dashboard"
import { actionDashboard } from "./components/dashboardHome"
import { actionLogin, Login } from "./routes/login"
import { AuthProvider } from "./context/authProvider"
import { Profile } from "./components/profile"
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
        action: actionDashboard,
        children: [
            {
                path: "/dashboard/profile",
                element: <Profile />
            }
        ]
    }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <AuthProvider>
        <RouterProvider router={router} />
    </AuthProvider>
);
