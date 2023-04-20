import { Outlet, redirect, useMatches } from "react-router-dom"
import { Header } from "../../components/header"
import { Nav } from "../../components/nav"
import DashboardHome from "../../components/dashboardHome"
import { connect } from "react-redux"
import { store } from "../../store"

async function loaderDashboard() {
    const state = store.getState().user
    if (!state || state === null) {
        return redirect('/')
    } else {
        return null
    }
}

function Dashboard({ user }) {
    const matches = useMatches()

    return (
        <div className="h-screen w-full">
            <header className="flex bg-blue-900 py-7 px-14">
                <Header />
                <Nav />
            </header>
            <main className="m-6">
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

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export { loaderDashboard }
export default connect(mapStateToProps)(Dashboard)
