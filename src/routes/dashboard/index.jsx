import { useContext } from "react"
import { useLoaderData } from "react-router-dom"
import { AuthContext } from "../../context/authProvider"

async function loaderDashboard() {
    return 'ok'
}

function Dashboard() {
    const { userLogin } = useContext(AuthContext)
    console.log({ userLogin })

    return (
        <div>
            Dash do id
        </div>
    )
}

export { Dashboard, loaderDashboard }