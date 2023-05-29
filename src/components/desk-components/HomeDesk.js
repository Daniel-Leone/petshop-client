import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import notFound from '../images/Petshop_sin-resultados.svg'

import { useAuthContext } from '../UseContextProvider'
import ProductCard from './reusableDesk/ProductCard'

const HomeDesk = () => {

    const { productsList, principalFilter, initState } = useAuthContext()

  return (
    <div className='home-desk'>
        <p className='title-section'>PRODUCTOS</p>
        <div className='catalogContainer'>
            { 
            principalFilter.length === 0 ?
                !initState ?
                    productsList.map( (prod, key) => {
                        
                        return <ProductCard prod={prod} key={key} />
                    }                     
                    )
                    :
                    <div className='not-found'>
                        <div className='message-container'>
                            <div>
                                <img src={notFound} alt='not found'/>
                            </div>
                            <p>No se encontraron productos con estas características. Recomendamos editar los filtros y realizar una nueva búsqueda.</p>
                        </div>
                    </div>
                :  
                principalFilter.map( (prod, key) => {  
                    return <ProductCard prod={prod} key={key} />
                }
                )
            }
            <p className='end-results'>Fin de los resultados para esta búsqueda.</p>
            </div>
    </div>
  )
}

export default HomeDesk