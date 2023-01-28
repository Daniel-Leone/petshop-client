import { createContext, useContext, useState } from 'react'

const AuthContext = createContext();

export const AuthProvider = ({...props}) => {

    const [auth, setAuth] = useState(false);

    const value = {
        auth,
        setAuth
    }

    return <AuthContext.Provider {...props} value={value} />
}

export const useAuthContext = () => {
    return useContext(AuthContext)
}