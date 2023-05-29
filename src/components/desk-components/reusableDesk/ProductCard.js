import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const ProductCard = ({prod, key}) => {

    const [available, setAvailable] = useState(false);
    const [sale, setSale] = useState(true);

  return (
    <div className='big-prod'> 
                        
    <div className='product-container' key={key}>

        <div className='img-container'>
            <img src={`${prod.productImage}`} alt={prod.productImage}/>
        </div>

        <div className='info-product'>

            <h2>{prod.title}</h2>
            <span className='price'>${prod.price}
                <span className={
                    sale ? 
                    available ? null : 
                        'invisible' 
                    : 'invisible'}>${prod.price}
                </span>
            </span>
    
            <p>para: {prod.age.toLowerCase()}</p>
            <p>{prod.weight} kg.</p>
            <p className={
            available ?
             sale ? 'sale' : null 
            : 'noStock'}>{
            available ?
             sale ? 'OFERTA' : null 
            : 'SIN STOCK' }</p>
    
            <div className='btns'>
                <Link to={{
                        pathname: `/product/${prod._id}`}}
                        className='add'>AGREGAR
                </Link>
            </div>
    
        </div>
    </div>
</div> 
  )
}

export default ProductCard