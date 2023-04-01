import { createContext, useContext, useMemo, useState } from "react"

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    const [userLogin, setUserLogin] = useState(null)

    const login = async (user) => {
        setUserLogin(user)
        return '/dashboard'
    }

    const logout = () => {
        setUserLogin(null)
        return '/'
    }

    const value = useMemo(() => ({
            userLogin, login, logout
        }),
        [userLogin]
    )

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

const useAuth = () => {
    return useContext(AuthContext)
}

export { AuthProvider, AuthContext, useAuth }
