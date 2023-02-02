import { createContext, useContext, useState } from 'react'

const AuthContext = createContext();

export const AuthProvider = ({...props}) => {

    const [auth, setAuth] = useState(false);
    const [update, setUpdate] = useState(false);
    const [principalFilter, setPrincipalFilter] = useState([]);
    const [cart, setCart] = useState([]);

    const value = {
        auth,
        setAuth,
        update,
        setUpdate,
        principalFilter,
        setPrincipalFilter,
        cart,
        setCart
    }

    return <AuthContext.Provider {...props} value={value} />
}

export const useAuthContext = () => {
    return useContext(AuthContext)
}