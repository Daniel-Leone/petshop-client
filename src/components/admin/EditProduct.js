import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../UseContextProvider'

import { toast } from 'react-toastify';
import FormProduct from '../reusable/FormComponent';
import { URL } from '../UseContextProvider';

// ADMIN COMPONENT

const EditProduct = () => {

  const [id, setId] = useState('')

  const [brand, setBrand] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState(undefined)
  const [weight, setWeight] = useState(undefined)
  const [image, setImage] = useState('')
  const [age, setAge] = useState();
  const [pet, setPet] = useState();

  const { auth, setAuth, update, setUpdate, productsList } = useAuthContext()

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
      age,
      pet
    }

    setBrand('');
    setTitle("");
    setDescription("");
    setPrice('');
    setWeight('')
    setImage('');
    setAge('');
    setPet("");

    axios
    .put(`${URL}/home/admin/${id}`, products)
    .then( res => {
      navigate('/admin')
      toast.success(res.data)
      setUpdate(!update)
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
                setAge(prod.age);
                setPet(prod.pet);
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
            setPet={setPet}
            setAge={setAge}
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