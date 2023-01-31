import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes, HashRouter } from 'react-router-dom'

import AddProd from './components/AddProd.js'
import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductsList from './components/ProductsList';
import Product from './components/Product';
import EditProduct from './components/EditProduct';
import AdminPage from './components/AdminPage';
import Navbar from './components/Navbar';

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminLogin from './components/AdminLogin';

import { useAuthContext } from './components/UseContextProvider'

export const URL = process.env.URL_SERVER;

function App() {

  const [productsList, setProductsList] = useState([]);

  const { update } = useAuthContext()
  
  
  useEffect( () => {

      // .get('/home') // prueba local
      axios
      .get(URL) // deploy
      .then( res => {
        setProductsList(res.data)
        console.log(res);
        console.log(res.data);
      })
      .catch( err => console.log(err, URL));
    }, [update])

  return (
    <div className="App">

      <ToastContainer /> {/* Notifications */}

      <HashRouter >

      <Navbar/>
      
        <Routes>

          {/* CLIENT PAGES */}

          <Route path='/' element={<ProductsList productsList={productsList}/>}/>

          <Route path='/product/:id' element={<Product productsList={productsList}/>} />

          {/* ADMIN PAGES */}

          <Route path='/adminAuth' element={<AdminLogin />} />

          <Route path='/admin' element={<AdminPage productsList={productsList}/>} />

          <Route path='/admin/:id' element={<EditProduct productsList={productsList} />} />

          <Route path='/admin/add' element={<AddProd/>} />          
          
        </Routes>

      </HashRouter >

    </div>
  );
}

export default App;
