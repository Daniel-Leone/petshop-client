import React, { useState, useEffect } from 'react'
import OrderCompleted from '../OrderCompleted'
import { useAuthContext } from '../UseContextProvider'
import ReactWhatsapp from 'react-whatsapp';
import quitar from '../images/Petshop_quitar.svg';

const CartDesk = () => {

  const [price, setPrice] = useState(0)
  const [sendOrder, setSendOrder] = useState(false)
  const [message, setMessage] = useState('')

  const [clientName, setClientName] = useState('')
  const [addressClient, setAddressClient] = useState('')

  const { cart, setCart } = useAuthContext()

  useEffect(() => {
    
      let value = 0;

      cart.map( prod => {
          value += prod.price * prod.quantity
          return value;
      } )

      setPrice(value);

      setMessage('');

      const cartItems = 'Mi pedido es: ' + cart.map(prod => `
      ________________________
      Marca: ${prod.brand}
      Producto: ${prod.title}
      Peso: ${prod.weight} kg.
      Precio x unidad: $${prod.price}
      Cantidad: ${prod.quantity}
      Precio total: $${prod.price * prod.quantity}
      ________________________
      `) + 
      `MONTO FINAL: $${value}
      entrega en ${addressClient} a nombre de ${clientName}`;

      setMessage(cartItems);

  }, [cart, addressClient, clientName])

  const removeCartProduct = (prod) => {
      setCart(cart.filter( removedProd =>  removedProd.id !== prod.id))
  }

  let ownerPhone = '+541150235970';

  return (
    <div className='cart-desk'>
        <div className='cart-container'>
            <p className='title-section'>PEDIDO</p>

            <div className='order'>
                <div className='order-titles'>
                  <p>Productos</p>
                  {
                      cart.map( (prod, key) => {
                          return (
                              <div className='prod-in-order' key={key}>
                                  <p>{prod.title}, {prod.age.toLowerCase()}, {prod.weight}kg. - x{prod.quantity}</p>
                                  <button onClick={() => removeCartProduct(prod)}> <img src={quitar}/> </button>
                              </div>
                          )
                      } )
                  }
                  <h3>Total: <b>${price}</b></h3>
                </div>
            </div>

            {
            cart.length !== 0 ?

            <div className='info-user'>
                <p>Datos de contacto</p>
                <ul>
                    <li>
                        <p>A nombre de: </p>
                        <input type='text' onChange={ e => setClientName(e.target.value)}/>
                    </li>
                    <li>
                        <p>Dirección: </p>
                        <input type='text' onChange={e => setAddressClient(e.target.value)}/>
                    </li>
                </ul>
            </div>

            : null
            }

            {
            price === 0 ? null : 
            <div className='btns'>
                        <ReactWhatsapp
                            className='add add-send'
                            onClick={() => setSendOrder(true)}
                            number={ownerPhone}
                            message={message}>
                            ENVIAR PEDIDO</ReactWhatsapp>
            </div>
            }

            {
            sendOrder ? 
                <OrderCompleted/>
            : null
            }

        </div>
    </div>
  )
}

export default CartDesk