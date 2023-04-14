import { NavLink } from "react-router-dom"
import { HomeIcon, ProfileIcon } from "../icons/icons"

function Nav() {
    const listNav = [
        {
            router: "/dashboard",
            value: "Home",
            icon: HomeIcon
        },
        {
            router: "/dashboard/profile",
            value: "Profile",
            icon: ProfileIcon
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
                        <NavLink
                            to={elementNav.router}
                            className="px-2 py-1 flex gap-2 cursor-pointer rounded-md transition-all hover:bg-blue-400 hover:text-black"
                        >
                            <elementNav.icon />
                            <div key={elementNav.value} >
                                {elementNav.value}
                            </div>
                        </NavLink>
                    ))
                }
            </nav>
        </section>
    )
}

export { Nav }