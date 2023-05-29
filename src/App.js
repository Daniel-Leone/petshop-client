import './styles/styles.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes, HashRouter } from 'react-router-dom'

import AddProd from './components/admin/AddProd.js'
import Product from './components/Product';
import EditProduct from './components/admin/EditProduct';
import AdminPage from './components/admin/AdminPage';

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminLogin from './components/admin/AdminLogin';
import Cart from './components/Cart';
import Home from './components/Home';
// import HomeDesk from './components/desk-components/HomeDesk';

function App() {

  return (
    <div className="App">

      <ToastContainer /> {/* Notifications */}

      <HashRouter >
      
        <Routes>

          {/* CLIENT PAGES */}

          <Route path='/' element={<Home/>}/>

          {/* <Route path='/' element={<HomeDesk/>}/> */}

          <Route path='/product/:id' element={<Product/>} />

          <Route path='/cart' element={<Cart/>} />

          {/* ADMIN PAGES */}

          <Route path='/adminAuth' element={<AdminLogin />} />

          <Route path='/admin' element={<AdminPage/>} />

          <Route path='/admin/:id' element={<EditProduct/>} />

          <Route path='/admin/add' element={<AddProd/>} />          
          
        </Routes>

      </HashRouter >

    </div>
  );
}

export default App;
