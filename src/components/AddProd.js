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

          <FormProduct
              setBrand={setBrand}
              setAnimal={setAnimal}
              setstagePet={setStagePet}
              setTitle={setTitle} title={title}
              setDescription={setDescription} description={description}
              setPrice={setPrice} price={price}
              setWeight={setWeight} weight={weight} 
          />

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

      : navigate('/adminAuth')
    }
    
    </>

  )
}

export default AddProd
