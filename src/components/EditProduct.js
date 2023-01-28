import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthContext } from './UseContextProvider'

import { toast } from 'react-toastify';
import FormProduct from './FormProduct';

// ADMIN COMPONENT

const EditProduct = ({productsList}) => {

  const [id, setId] = useState('')

  const [brand, setBrand] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState(undefined)
  const [weight, setWeight] = useState(undefined)
  const [image, setImage] = useState('')
  const [stagePet, setStagePet] = useState();
  const [animal, setAnimal] = useState();

  const { auth, setAuth } = useAuthContext()

  const navigate = useNavigate()

  const data = JSON.parse(localStorage.getItem('adminData'))

  if(data){
    setAuth(true)
  }

  setTimeout( () => {
    productsList.map(prod => {
      if(`#/admin/${prod._id}` === window.location.hash){
          setId(prod._id);
      }
  })
  }, 100)

  const changeOnClick = evt => {
    evt.preventDefault();

    const products = {
      brand,
      title,
      description,
      price,
      weight,
      image,
      stagePet,
      animal
    }

    setBrand('');
    setTitle("");
    setDescription("");
    setPrice('');
    setWeight('')
    setImage('');
    setStagePet('');
    setAnimal("");

    axios
    .put(`https://server-petshop.onrender.com/home/admin/${id}`, products)
    .then(res => {
      toast.success(res.data)
    })
    .catch(err => {
      toast.error(err.response)
    })

  }

  useEffect(() => {  
  
    try {
      
      productsList.map(prod => {

            if(`#/admin/${prod._id}` === window.location.hash){
                setBrand(prod.brand)
                setTitle(prod.title);
                setDescription(prod.description);
                setPrice(prod.price);
                setWeight(prod.weight);
                setImage(prod.productImage);
                setStagePet(prod.stagePet);
                setAnimal(prod.animal);
            }
        })
    } catch (err) {
        console.log(err);
    }

}, []);

  return (

   <>
   
    {
      auth ?

      <div className="submit-form">

    <h1 className='my-3'>Editar producto</h1>

      { (
        <div>

        <form onSubmit={changeOnClick} encType='multipart/form-data'>

          <FormProduct 
            setBrand={setBrand}
            setAnimal={setAnimal}
            setStagePet={setStagePet}
            setTitle={setTitle} title={title}
            setDescription={setDescription} description={description}
            setPrice={setPrice} price={price}
            setWeight={setWeight} weight={weight} />

          <div style={{width: '13vw', height: '40vh'}}>
              <img src={image} alt={image} style={{width: '100%', height: '100%'}}/>
          </div>

          <button type='submit' className="btn btn-success my-3">
            confirmar edición
          </button>

        </form>

        <Link to='/admin' className="btn btn-info">
            Volver
        </Link>

        </div>
      )}
      </div>

    : navigate('/adminAuth')

    }
    
   </>

  )
}

export default EditProduct
