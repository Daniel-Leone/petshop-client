import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuthContext } from './UseContextProvider'

// CLIENT COMPONENT

const Product = ({productsList}) => {

    const [id, setId] = useState('')
    const [brand, setBrand] = useState('')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState(null)
    const [weight, setWeight] = useState(null)
    const [image, setImage] = useState('')

    const { cart, setCart } = useAuthContext()
        
    setTimeout(() => {  

        try {
            
            productsList.map(prod => {

                if(`#/product/${prod._id}` === window.location.hash){
                    setId(prod._id)
                    setBrand(prod.brand)
                    setTitle(prod.title);
                    setDescription(prod.description);
                    setPrice(prod.price);
                    setWeight(prod.weight);
                    setImage(prod.productImage);
                }
            })

        } catch (err) {       
            console.log(err);
        }

    }, 1);

    const addToCart = () => {
        setCart([...cart, { id, title, price, weight, brand}])
    }

  return (

    <>

        <div className='d-flex flex-column container my-5 align-items-center'>
            <h2 className="title">{title}</h2>

            <div style={{width: '13vw', height: '40vh'}}>
                <img src={image} alt={image} style={{width: '100%', height: '100%', backgroundSize: 'cover'}}/>
            </div>

            <p className="">{description}</p>
            <p className="">${price}</p>
            <p className="">{weight}KG</p>

            <div className='flex-row'>
                <Link to='/' className="btn btn-info">
                    Volver
                </Link>

                <button className='btn btn-warning' onClick={addToCart}>Agregar al carrito</button>
            </div>
        </div>
    </>
  )
}

export default Product
