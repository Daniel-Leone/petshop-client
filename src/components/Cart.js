import React, { useState, useEffect } from 'react'
import { useAuthContext } from './UseContextProvider'

const Cart = () => {

    const [price, setPrice] = useState(0)

    const { cart, storageCart } = useAuthContext()

    useEffect(() => {
      
        let value = 0;

        if(storageCart.length === 0){
            cart.map( prod => {
                value += prod.price
                return value;
            } )
        } else {
            storageCart.map( prod => {
                value += prod.price
                return value;
            } )
        }

        setPrice(value)

    }, [])

  return (
    <div style={{display:'flex', flexDirection: 'column', justifyContent: 'space-around', height:'80vh'}}>
        { 
        
            storageCart.length === 0 ?
            
            cart.length === 0 ?

            <h3>¡El carrito está vacío!</h3> :

            cart.map( prod => {
                return (
                    <div style={{display:'flex', justifyContent:'space-evenly', border:'1px solid black', borderRadius:'5px', width:'50vw'}}>
                        <p>{prod.title}</p>
                        <p>{prod.brand}</p>
                        <p>{prod.price}</p>
                        <p>{prod.weight}</p>
                    </div>
                )
            } )

            :

            storageCart.map( prod => {
                return (
                    <div style={{display:'flex', justifyContent:'space-evenly', border:'1px solid black', borderRadius:'5px', width:'50vw'}}>
                        <p>{prod.title}</p>
                        <p>{prod.brand}</p>
                        <p>{prod.price}</p>
                        <p>{prod.weight}</p>
                    </div>
                )
            } )

        }

        {
            storageCart.length !== 0 || cart.length !== 0
            ? <h3>Total: ${price}</h3>
            : <h3>¡El carrito está vacío!</h3>
        }

    </div>
  )
}

export default Cart