import React from 'react'
import { Link } from 'react-router-dom'

const PreviewComponent = ({iteratefunction}) => {
  return (
    
    <>
        {
            iteratefunction.map( (prod, key) => {
                
                return <div className='d-flex flex-column container my-5 align-items-center' key={key}>
            
                            <h2>{prod.title}</h2>
                
                                <div style={{width: '13vw', height: '40vh'}}>
                                    <img src={`${prod.productImage}`} alt={prod.productImage} style={{width: '100%', height: '100%'}}/>
                                </div>
                
                                <p>{prod.description}</p>
                                <p>${prod.price}</p>
                                <p>{prod.weight}KG</p>
                                        
                                <div className='row my-2 justify-content-between '>
                
                                    <div className='col-sm-2' style={{width: '15vw', height: '5vh'}}>
                                        <Link to={{
                                            pathname: `/product/${prod._id}`
                                            }} className='btn btn-outline-success'>Ver</Link>
                                    </div>
                
                                </div>
                        </div>

            } )
        }
    </>

  )
}

export default PreviewComponent