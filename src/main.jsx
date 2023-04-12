import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { ErrorPage } from "./routes/error"
import { Register } from "./routes/register"
import Dashboard, { loaderDashboard } from "./routes/dashboard"
import { actionDashboard } from "./components/dashboardHome"
import Login, { actionLogin } from "./routes/login"
import { Profile } from "./components/profile"
import { Provider } from "react-redux"
import { store } from "./store"
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
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
)
