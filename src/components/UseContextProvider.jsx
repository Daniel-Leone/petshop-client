import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios';

const AuthContext = createContext();

export const URL = process.env.REACT_APP_URL_SERVER;

export const AuthProvider = ({...props}) => {

    const [auth, setAuth] = useState(false);
    const [update, setUpdate] = useState(false);
    const [initState, setInitState] = useState(false);
    
    const [filters, setFilters] = useState({});
    
    const [principalFilter, setPrincipalFilter] = useState([]);
    const [cart, setCart] = useState([]);
    const [productsList, setProductsList] = useState([]);

    
    // .get(`https://server-petshop.onrender.com/home`) // deploy
    useEffect( () => {
      axios
      .get(`${URL}/home`) // deploy
        .then( res => setProductsList(res.data))
        .catch( err => console.log(err, URL));
      }, [update])

    const value = {
        auth,
        setAuth,
        update,
        setUpdate,
        principalFilter,
        setPrincipalFilter,
        cart,
        setCart,
        filters,
        setFilters,
        productsList,
        initState,
        setInitState
    }

    return <AuthContext.Provider {...props} value={value} />
}

export const useAuthContext = () => {
    return useContext(AuthContext)
}