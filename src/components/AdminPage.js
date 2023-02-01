import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAuthContext } from './UseContextProvider'

import { toast } from 'react-toastify'
import { URL } from '../App'

// ADMIN COMPONENT

const AdminPage = ({productsList}) => {

    const [product, setProduct] = useState([])

    const { auth, setAuth, update, setUpdate } = useAuthContext()

    const navigate = useNavigate()
    
    useEffect( () => {

        const data = JSON.parse(localStorage.getItem('adminData'))

        if(data) setAuth(true);

    }, [])

    const refresh = () => {
        navigate('/adminAuth')
        return window.location.reload()
      }

    // DELETE ARTICLE BY ID

    const deleteProduct = id => {
        
        axios.delete(`${URL}/home/admin/${id}`)
             .then(res => {
                toast.success(res.data)
                setProduct(product.filter( elem => elem._id !== id))
                setUpdate(!update)
            })
            .catch(res => {
                toast.error(res.message)
            })
    }

  return (

    <>
    { auth
    
    ?

    <>
        <button className='btn btn-warning' onClick={ () => {
            localStorage.removeItem('adminData')
            toast.warning('sesion cerrada, redireccionando...')
            navigate('/adminAuth') 
            }}> Cerrar Sesión
        </button>

    <div className='d-flex flex-row'>

    { !productsList ? <p>Productos...</p> :
    
    productsList.map( (prod, key) => {
        
        return <div className='d-flex flex-column container my-5 align-items-center' key={key}>

                    <h2>{prod.title}</h2>

                    <div style={{width: '13vw', height: '40vh'}}>
                        <img src={prod.productImage} alt={prod.productImage} style={{width: '100%', height: '100%'}}/>
                    </div>

                    <p>{prod.description}</p>
                    <p>${prod.price}</p>
                    <p>{prod.weight}KG</p>
                    
                    <div className='row my-2 justify-content-between '>

                        <div className='col-sm-2' style={{width: '15vw', height: '5vh'}}>
                            <Link to={{
                                pathname: `/admin/${prod._id}`
                            }} className='btn btn-outline-warning'>Edit product</Link>
                        </div>

                        <div className='col-sm-2' style={{width: '15vw', height: '5vh'}}>
                            <button onClick={()=> deleteProduct(prod._id)} className='btn btn-outline-danger'>delete product</button>
                        </div>

                    </div>
                </div>

        } )
    } 
</div>
    </>
    
    :       
    <>
        <h3>¡Parece que no tienes los permisos necesarios para ingresar aquí! Intenta registrarte haciendo acá ↓</h3>
        <button onClick={ () =>  refresh()}>Login</button>
    </>
    
    }

    </>
  )
}

export default AdminPage
