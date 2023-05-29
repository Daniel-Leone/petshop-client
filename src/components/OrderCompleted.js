import React from 'react'
import { useAuthContext } from './UseContextProvider'
import { useEffect } from 'react';
import addedProduct from './images/Petshop_carga-exitosa.svg'
import { Link } from 'react-router-dom';

const OrderCompleted = () => {

  const {setCart} = useAuthContext();

  useEffect(() => {
    setCart([]);
  }, [])
  

  return (
    <>
      <div className='order-sended'>
        <div className='message-container'>
          <div>
            <img src={addedProduct} alt='addedProduct'/>
          </div>
          <p>Gracias por su pedido. <br></br> Este ya ha sido enviado y en breve usted será contactado/a para completar su compra.</p>
        </div>

        <div className='btns'>
          <Link to='/' className="add">VOLVER</Link>
        </div>

      </div>
    </>
  )
}

export default OrderCompleted