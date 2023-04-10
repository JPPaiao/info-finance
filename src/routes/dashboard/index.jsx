import { Outlet, redirect, useActionData, useMatches } from "react-router-dom"
import { Header } from "../../components/header"
import { Nav } from "../../components/nav"
import { useAuth } from "../../context/authProvider"
import { DashboardHome } from "../../components/dashboardHome"

async function loaderDashboard() {
    const response = await fetch('http://127.0.0.1:5000/')
    .then(r => r.json())

    return response
}

function Dashboard() {
    const { userLogin } = useAuth()
    const matches = useMatches()
    // console.log(userLogin)

    // if (userLogin == null) {
    //     redirect("/")
    // }

    return (
        <div>
            <section className="flex bg-blue-900 py-7 px-14">
                <Header />
                <Nav />
            </section>
            {
                matches.length === 1
                ? (
                    <DashboardHome />
                ) : (
                    <Outlet />
                )
            }
        </div>
    )
}

export { Dashboard, loaderDashboard }