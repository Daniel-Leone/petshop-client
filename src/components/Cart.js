import React, { useState, useEffect } from 'react'
import { useAuthContext } from './UseContextProvider'

const Cart = () => {

    const [price, setPrice] = useState(0)

    const { cart, setCart } = useAuthContext()

    useEffect(() => {
      
        let value = 0;

        cart.map( prod => {
            value += prod.price
            return value;
        } )

        setPrice(value)

    }, [cart])

    const removeCartProduct = (prod) => {
        setCart(cart.filter( removedProd =>  removedProd.id !== prod.id))
    }

    const sendOrder = () => {
        console.log(cart);
    }

  return (
    <div style={{display:'flex', flexDirection: 'column', justifyContent: 'space-around', height:'80vh'}}>
        { 

            cart.length !== 0 ?

            cart.map( (prod, key) => {
                return (
                    <div style={{display:'flex', justifyContent:'space-evenly', alignItems:'center', border:'1px solid black', borderRadius:'5px', width:'50vw'}} key={key}>
                        <p>{prod.title}</p>
                        <p>{prod.brand}</p> 
                        <p>{prod.price}</p>
                        <p>{prod.weight}</p>
                        <button onClick={() => removeCartProduct(prod)}>X</button>
                    </div>
                )
            } )

            : <h3>¡El carrito está vacío!</h3>

        }

        {
            price === 0 ? null : 
            <div className='col-sm-12'> 
                <h3>Total: ${price}</h3>
                <button className='btn btn-success' onClick={sendOrder}>Realizar pedido</button>
            </div>
        }

    </div>
  )
}

export default Cart