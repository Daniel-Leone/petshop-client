import axios from 'axios';
import React, { useState } from 'react'
import { useAuthContext } from '../UseContextProvider'
import { useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { URL } from '../UseContextProvider';

const AdminLogin = () => {

    const [username, setUserName] = useState();
    const [password, setPassword] = useState();

    const { setAuth } = useAuthContext()

    const navigate = useNavigate()

    const userlogin = e => {

        e.preventDefault()

        axios
        .get(`${URL}/home/adminAuth`)
        .then( res => {

            if(res.data[0].username === username &&
                res.data[0].password === password ){
                setAuth(true)
                toast.success(`Bienvenido ${username}`)
                localStorage.setItem('adminData', JSON.stringify(res.data[0]) )
                navigate('/admin')
            } else {
                setAuth(false)
                toast.error('Usuario o contraseña incorrectos')
                navigate('/adminAuth')
            }
        })
        .catch( err => console.log('error: ', err))
    }

  return (
    
    <form onSubmit={userlogin} className='login-container'>
        
        <div>
            <label>Nombre de Usuario</label>
            <input
                className='' 
                type='text'
                placeholder='Nombre de usuario'
                onChange={ e => setUserName(e.target.value)} 
                required/>
        </div>

        <div>
            <label>Contraseña</label>
            <input
                className=''
                type='password'
                placeholder='Contraseña'
                onChange={ e => setPassword(e.target.value) }
                required/>

        </div>

        <button type='submit' className='add'>Acceder</button>
    </form>

  )
}

export default AdminLogin