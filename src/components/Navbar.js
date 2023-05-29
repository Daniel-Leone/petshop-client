import React from 'react'
import { Link } from 'react-router-dom'
import { useAuthContext } from './UseContextProvider'
import carrito from './images/Petshop_favicon_ÍCONO PLATO_.svg'
import wave from './images/Petshop_enzabezado_mobile_s-icono.svg'
import logotype from './images/Petshop_logotipo_LOGOTIPO.svg'

const Navbar = () => {

  const { cart } = useAuthContext()
  return (
    <>
      <div className='nav-container'>

        <div className='wave-container'>
          <img src={wave} className='wave-img' alt='navbar'/>
        </div>

        <div>
          <Link to='/cart'>
            <div className='nav-cart-container'>
              {
                cart.length === 0 ? null : <span>{cart.length}</span>
              }
              <img src={carrito} alt='carrito'></img>
            </div>
          </Link>
        </div>
      </div>

      <div className='nav-container-desk'>
        <img src={logotype} className='logotype-img' alt='logotype'/>
      </div>
    </>
  )
}

export default Navbar