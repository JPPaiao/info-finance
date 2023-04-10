import { NavLink } from "react-router-dom"

function Nav() {
    const listNav = [
        {
            router: "/dashboard",
            value: "Home"
        },
        {
            router: "/dashboard/profile",
            value: "Profile"
        }
    ]

    const style = {
        borderBottomStyle: "solid",
        borderBottomColor: "#517fff",
        borderBottomWidth: "4px"
    }

    return (
        <section className="px-2 flex items-center">
            <nav className="flex justify-center gap-4 text-white font-semibold">
                {
                    listNav.map(elementNav => (
                        <>
                            <NavLink
                                key={elementNav.value}
                                to={elementNav.router}
                                // style={({ isActive }) => {return isActive ? style : null}}
                                className="px-2 py-1 rounded-md transition-all hover:bg-blue-400 hover:text-black"
                            >{elementNav.value}</NavLink>
                        </>
                    ))
                }
            </nav>
        </section>
    )
}

export { Nav }