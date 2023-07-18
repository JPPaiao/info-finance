import { Outlet, redirect, useMatches } from "react-router-dom"
import { Header } from "../../components/header"
import { Nav } from "../../components/nav"
import { store } from "../../store"
import DashboardHome from "../../components/dashboardHome"

async function loaderDashboard() {
    const user = store.getState().user.user
    const table = store.getState().tableDay
    // if (!user || user === null) {
    //     return redirect('/')
    // }
    return {
        table: table, 
        user: user 
    }
}

function Dashboard() {
    const matches = useMatches()

    return (
        <div>
            <header className="flex bg-blue-900 py-7 px-14">
                <Header />
                <Nav />
            </header>
            <main className="m-6 bg-zinc-200">
                {
                    matches.length === 1
                    ? (
                        <DashboardHome />
                    ) : (
                        <Outlet />
                        )
                }
            </main>
        </div>
    )
}

export { loaderDashboard }
export default Dashboard
