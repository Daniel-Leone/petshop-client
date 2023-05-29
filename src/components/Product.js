import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuthContext } from './UseContextProvider'
import Navbar from './Navbar'
import addedProduct from './images/Petshop_carga-exitosa.svg'
import arrow from './images/Petshop_flecha.svg'

// CLIENT COMPONENT

const Product = () => {

    const [id, setId] = useState('')
    const [brand, setBrand] = useState('')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState(null)
    const [weight, setWeight] = useState(null)
    const [image, setImage] = useState('')
    const [age, setAge] = useState('')

    const [aggregate, setAggregate] = useState(false);

    const [quantity, setQuantity] = useState(1);

    const { cart, setCart, productsList } = useAuthContext()
        
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
                    setAge(prod.age)
                }
            })

        } catch (err) {       
            console.log(err);
        }

    }, 1);

    const addToCart = () => {
        setCart([...cart, { id, title, price, weight, brand, quantity, age}])
        setAggregate(true);
    }

    const addQuantity = () => {
        setQuantity(quantity + 1)
    }

    const subtrQuantity = () => {
        if(quantity > 1){
            setQuantity(quantity - 1)
        } else {
            setQuantity(1)
        }
    }

  return (
    <>


    {
        !aggregate ? 
        <>
        <Navbar name='PRODUCTO:'/>
                <div className='product-component'>

                    <div className='individual-prod'>

                        <h2 className="title">{title} {age.toLowerCase()} {weight} kg.</h2>

                        <div className='image-container'>
                            <img src={image} alt={image}/>
                        </div>

                        <div className='xcont'>
                            <p>Precio por unidad: ${price}</p>

                            <div className='controls-container'>
                                <p>Cantidad</p> 
                                <div className='controls'>
                                    <span onClick={subtrQuantity}> <img src={arrow}/> </span>
                                    <span className='value'>{quantity}</span>
                                    <span onClick={addQuantity}> <img src={arrow} style={{transform:'rotate(180deg)'}}/> </span>
                                </div>
                            </div>
                            <p>Subtotal: ${price*quantity}</p>
                        </div>

                        <div className='btns'>
                            <button className='add' onClick={addToCart}>AGREGAR AL PEDIDO</button>
                            <Link to='/' className="add">VOLVER</Link>
                        </div>
                    </div>
                </div>
        </>
        :
        <>
        <Navbar/>
        <div className='product-agg'>
            <div className='message-container'>
                <div>
                    <img src={addedProduct} alt='addedProduct'/>
                </div>
                <p>El producto ha sido agregado correctamente a su pedido.</p>
            </div>

            <div className='btns'>
                <Link to='/cart' className='add first-add'>VER PEDIDO</Link>
                <Link to='/' className="add">VOLVER</Link>
            </div>
        </div>
        </>
    }
    </>
  )
}

export default Product
