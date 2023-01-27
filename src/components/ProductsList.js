import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import whatsAppIcon from './images/whatsapp-icon.png'
import BounceLoader from 'react-spinners/BounceLoader'

// CLIENT COMPONENT

const ProductsList = ({productsList}) => {

    const [brandValue, setBrandValue] = useState(undefined);
    const [weightValue, setWeightValue] = useState([]);
    const [priceValue, setPriceValue] = useState([]);
    const [stagePet, setstagePet] = useState(undefined);
    const [animal, setAnimal] = useState(undefined);

    const [principalFilter, setPrincipalFilter] = useState([]);
    const [initState, setInitState] = useState(undefined);

    const [loading, setLoading] = useState(false);

    useEffect( () => {
        setLoading(true)
        setTimeout( () => {
            setLoading(false)
        }, 2000)
    }, [principalFilter] )

    const arrayFilter = () => { 
        
        let filtrado = productsList.filter( prod => {
        
        if(weightValue.length === 0){

            return (
                brandValue === prod.brand &&
                priceValue[0] <= prod.price && prod.price <= priceValue[1] &&
                stagePet === prod.stagePet &&
                animal === prod.animal )

        } else if ( brandValue === undefined ) {

            return (
                weightValue[0] <= prod.weight && prod.weight <= weightValue[1] &&
                priceValue[0] <= prod.price && prod.price <= priceValue[1] &&
                stagePet === prod.stagePet &&
                animal === prod.animal )

        } else if ( priceValue.length === 0) {
            
            return (
                brandValue === prod.brand &&
                weightValue[0] <= prod.weight && prod.weight <= weightValue[1] &&
                stagePet === prod.stagePet &&
                animal === prod.animal )

         } else if (stagePet === undefined) {

            return (
                brandValue === prod.brand &&
                weightValue[0] <= prod.weight && prod.weight <= weightValue[1] &&
                priceValue[0] <= prod.price && prod.price <= priceValue[1] &&
                animal === prod.animal )

         } else if (animal === undefined) {

            return (
                brandValue === prod.brand &&
                weightValue[0] <= prod.weight && prod.weight <= weightValue[1] &&
                priceValue[0] <= prod.price && prod.price <= priceValue[1] &&
                stagePet === prod.stagePet)
         }
          else {

            return (
                weightValue[0] <= prod.weight && prod.weight <= weightValue[1] &&
                brandValue === prod.brand &&
                priceValue[0] <= prod.price && prod.price <= priceValue[1] &&
                stagePet === prod.stagePet &&
                animal === prod.animal)

          }

    })

    setInitState(1);
    setPrincipalFilter(filtrado); 
}

return(
    <>

    <div style={{ display: 'flex', backgroundColor: 'grey', height: '5vh', width: '100vw'}}>
        
        <ul style={{ display: 'flex', justifyContent: 'space-around', height: '100%', width: '100%'}}>
        
            <button onClick={ () => window.location.reload()}>Restablecer filtros</button>
        
            {/* FILTER BRAND */}
        
            <details style={{zIndex: '1'}}>
        
                <summary>Marca</summary>
                    
                    <p style={{padding: '.2rem .5rem', backgroundColor: 'grey'}}>Dog Chow <input type='radio' name='brand' id='DOG CHOW' onClick={ e => setBrandValue(e.target.id)}/> </p>
        
                    <p style={{padding: '.2rem .5rem', backgroundColor: 'grey'}}>Pedigree <input type='radio' name='brand' id='PEDIGREE' onClick={e => setBrandValue(e.target.id)}/></p>
        
                    <p style={{padding: '.2rem .5rem', backgroundColor: 'grey'}}>Dogi <input type='radio' name='brand' id='DOGI' onClick={e => setBrandValue(e.target.id)}/></p>
        
            </details>
        
            {/* FILTER WEIGHT */}
        
            <details style={{zIndex: '1'}}>
        
                <summary>Peso</summary>
        
                    <p style={{padding: '.2rem .5rem', backgroundColor: 'grey'}}>1kg a 10kg <input type='radio' name='kg' onClick={ () => setWeightValue([1, 10]) }/> </p>
        
                    <p style={{padding: '.2rem .5rem', backgroundColor: 'grey'}}>11kg a 20kg <input type='radio' name='kg' onClick={() => setWeightValue([11, 20])}/></p>
        
                    <p style={{padding: '.2rem .5rem', backgroundColor: 'grey'}}>+ de 20kg <input type='radio' name='kg' onClick={() => setWeightValue([21, 100])}/></p>
        
            </details>
        
            {/* FILTER PRICE */}
        
            <details style={{zIndex: '1'}}>
        
                <summary>Rango de precio</summary>
        
                    <p style={{padding: '.2rem .5rem', backgroundColor: 'grey'}}>Hasta $2000 <input type='radio' name='price' onClick={ () => setPriceValue([0, 2000]) }/> </p>
        
                    <p style={{padding: '.2rem .5rem', backgroundColor: 'grey'}}>$2000 a $5000 <input type='radio' name='price' onClick={ () => setPriceValue([2000, 5000]) }/></p>
        
                    <p style={{padding: '.2rem .5rem', backgroundColor: 'grey'}}>+ de $5000 <input type='radio' name='price' onClick={ () => setPriceValue([5000, 100000]) }/></p>
        
            </details>
        
            {/* FILTER STAGE */}
        
            <details style={{zIndex: '1'}}>
                <summary>Etapa</summary>
        
                <p style={{padding: '.2rem .5rem', backgroundColor: 'grey'}}>CACHORRO <input type='checkbox' name='stagePet' onClick={ () => setstagePet('CACHORRO') }/> </p>
        
                <p style={{padding: '.2rem .5rem', backgroundColor: 'grey'}}>ADULTO <input type='checkbox' name='stagePet' onClick={ () => setstagePet('ADULTO')}/></p>
        
            </details>
        
            {/* FILTER ANIMAL */}
        
            <details style={{zIndex: '1'}}>
                <summary>Animal</summary>
        
                <p style={{padding: '.2rem .5rem', backgroundColor: 'grey'}}>PERRO <input type='checkbox' name='kg' onClick={ () => setAnimal('PERRO') }/> </p>
        
                <p style={{padding: '.2rem .5rem', backgroundColor: 'grey'}}>GATO <input type='checkbox' name='kg' onClick={() => setAnimal('GATO')}/></p>
        
            </details>
        
            { brandValue === undefined || weightValue.length === 0
                ? null
                : <button onClick={arrayFilter}>Buscar productos</button>
            }
    
        </ul>
        
    </div>
            
    <div className='d-flex flex-row'>
            
        { loading 

        ?   <div className='spinner'>
                <BounceLoader color='red' loading={loading} size={100} />
            </div>

        : principalFilter.length === 0 ? 
                
            initState === undefined ?
                
                productsList.map( (prod, key) => {
                    
                    return(
                    
                    <div className='d-flex flex-column container my-5 align-items-center' key={key}>
        
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
                    )
                })
        
            :
        
                <h2 style={{textAlign: 'center', width: '100vw'}}>No hay coincidencias</h2>
        
                :
        
                principalFilter.map( (prod, key) => {
                    
                    return(
                    
                    <div className='d-flex flex-column container my-5 align-items-center' key={key}>
            
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
                    )
                })       
        } 
        
        <img src={whatsAppIcon} alt='whatsapp-icon' className="btn" style={{position:'fixed', right: '2vw', bottom: '2vh'}} />
                    
    </div>
    </>
)
}

export default ProductsList
