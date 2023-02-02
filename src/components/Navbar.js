import React from 'react'
import { Link } from 'react-router-dom'
import perros from './images/plato-para-perros (1).png'
import { useAuthContext } from './UseContextProvider'

const Navbar = () => {

  // CUANDO SE AGREGA O BORRA UN PRODUCTO DEL CARRITO, TAMBIEN LO HACE DEL LOCALSTORAGE
  // CUANDO EL CLIENTE GENERA EL CUPÓN DE COMPRA, RECÍEN AHÍ SE BORRA EL LOCALSTORAGE

  const { cart, storageCart } = useAuthContext()

  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark" style={{display:'flex', justifyContent: 'space-evenly'}}>
        <Link to="/" className="navbar-brand"> products user </Link>
        <Link to="/adminAuth" className="navbar-brand"> admin auth </Link>
        <Link to="/admin" className="navbar-brand"> products admin </Link>
        <Link to="/admin/add" className="navbar-brand"> add </Link>

        <Link to='/cart'>
          <div style={{display:'flex'}} onClick={ () => localStorage.setItem('cart', JSON.stringify(cart)) }>
            <img src={perros} alt={perros}/>
              {
                storageCart.length === 0 ?
                  cart.length === 0 ?
                  null : 
                    <div style={{width:'1rem', height:'1rem', borderRadius:' 50%', backgroundColor:'red', color:'white', textAlign:'center'}}>
                      {cart.length}
                    </div> 
                :

                  <div style={{width:'1rem', height:'1rem', borderRadius:' 50%', backgroundColor:'red', color:'white', textAlign:'center'}}>
                    {storageCart.length}
                  </div> 
              }
          </div>
        </Link>
    </nav>
    
  )
}

export default Navbar
