import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthContext } from './UseContextProvider'

import { toast } from 'react-toastify';

// ADMIN COMPONENT

const EditProduct = ({productsList}) => {

  const [id, setId] = useState('')

  const [brand, setBrand] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState(undefined)
  const [weight, setWeight] = useState(undefined)
  const [image, setImage] = useState('')
  const [stagePet, setstagePet] = useState();
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
    setstagePet('');
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
                setstagePet(prod.stagePet);
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

          <details>

            <summary>Marca</summary>

            <p> Dog Chow <input type='radio' name='brand' id='DOG CHOW' onClick={e => setBrand(e.target.id)}/> </p>
            <p> Pedigree <input type='radio' name='brand' id='PEDIGREE' onClick={e => setBrand(e.target.id)}/>  </p>
            <p> Dogi <input type='radio' name='brand' id='DOGI' onClick={e => setBrand(e.target.id)}/>  </p>

          </details>

          <details>

            <summary>Animal</summary>
            
              <p>PERRO <input type='radio' name='kg' onClick={ () => setAnimal('PERRO') }/> </p>
              <p>GATO <input type='radio' name='kg' onClick={() => setAnimal('GATO')}/></p>

          </details>

          <details style={{zIndex: '1'}}>

            <summary>Etapa</summary>

              <p>CACHORRO <input type='radio' name='stagePet' onClick={ () => setstagePet('CACHORRO') }/> </p>
              <p>ADULTO <input type='radio' name='stagePet' onClick={ () => setstagePet('ADULTO')}/></p>

          </details>
          
          <div className="form-group">
            <label htmlFor="title">Título</label>
            <input 
              type="text"
              className="form-control"
              placeholder='nombre del producto'
              onChange={e => setTitle(e.target.value)}
              value={title}
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Descripción</label>
            <input
              type="text"
              className="form-control"
              placeholder='descripción'
              onChange={e => setDescription(e.target.value)}
              value={description}
            />
          </div>

          <div className="form-group">
            <label htmlFor="price">Precio</label>
            <input
              type="number"
              className="form-control"
              placeholder='precio'
              onChange={ e => setPrice(e.target.value) }
              value={price}
            />
          </div>

          <div className="form-group">
            <label htmlFor="weight">Peso</label>
            <input
              type="number"
              className="form-control"
              placeholder='Peso'
              onChange={ e => setWeight(e.target.value) }
              value={weight}
            />
          </div>

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
