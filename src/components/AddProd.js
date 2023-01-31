import React, { useState } from 'react'
import axios from 'axios'
import { useAuthContext } from './UseContextProvider'
import { useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FormProduct from './FormProduct';

// ADMIN COMPONENT

const AddProd = () => {

  const [brand, setBrand] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState(null)
  const [weight, setWeight] = useState(null)
  const [image, setImage] = useState('')
  const [stagePet, setStagePet] = useState();
  const [animal, setAnimal] = useState();

  const { auth, setAuth, update, setUpdate } = useAuthContext()

  const navigate = useNavigate()

  const refresh = () => {
    navigate('/adminAuth')
    return window.location.reload()
  }

  const data = JSON.parse(localStorage.getItem('adminData'))

  if(data) setAuth(true);

  const onChangeFile = evt => {
    setImage(evt.target.files[0])
  }

  const changeOnClick = evt => {
    evt.preventDefault();

    const formData = new FormData();

    formData.append('brand', brand);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('weight', weight);
    formData.append('productImage', image);
    formData.append('stagePet', stagePet);
    formData.append('animal', animal);
    
    axios
    .post('https://server-petshop.onrender.com/home/admin/add', formData)
    .then(res => {
      setUpdate(!update)
      toast.success(res.data)
    })
    .catch(err => {
      toast.error(err.response.data)
    })
    
    setBrand('');
    setTitle("");
    setDescription("");
    setPrice('');
    setWeight('');
    setImage("");
    setStagePet('');
    setAnimal("");
  }

  return (

    <>
    
    {
      auth ?
      
      <div className="submit-form">

    <h1 className='my-3'>Crear producto</h1>

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

            <p>PERRO <input type='radio' name='animal' onClick={ () => setAnimal('PERRO') }/> </p>
            <p>GATO <input type='radio' name='animal' onClick={() => setAnimal('GATO')}/></p>

          </details>

          <details style={{zIndex: '1'}}>

            <summary>Etapa</summary>

              <p>CACHORRO <input type='radio' name='stagePet' onClick={ () => setStagePet('CACHORRO') }/> </p>
              <p>ADULTO <input type='radio' name='stagePet' onClick={ () => setStagePet('ADULTO')}/></p>

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
            <textarea
              rows='3'
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
              placeholder='peso'
              onChange={ e => setWeight(e.target.value) }
              value={weight}
            />
          </div>

          <div className="form-group">
            <label htmlFor="productImage">Upload image</label>
            <input
              multiple
              type="file"
              className="form-control-file my-3"
              id="productImage"
              filename='productImage'
              name='productImage'
              onChange={onChangeFile}
            />
          </div>

          { image === '' ? null : 
            <div style={{width: '13vw', height: '40vh'}}>
              <img src={`http://server-petshop.onrender.com/public/${image.name}`} alt={image.name} style={{width: '100%', height: '100%'}}/>
            </div>
          }

          <button type='submit' className="btn btn-success my-3">
            Submit
          </button>

        </form>

        </div>
      )}
    </div>

      : 
      <>
        <h3>¡Parece que no tienes los permisos necesarios para ingresar aquí! Intenta registrarte haciendo acá ↓</h3>
        <button onClick={ () =>  refresh() }>Login</button>
      </>
    }
    
    </>

  )
}

export default AddProd
