import React, { useState, useEffect } from 'react'
import whatsAppIcon from './images/whatsapp-icon.png'
import BounceLoader from 'react-spinners/BounceLoader'
import PreviewComponent from './PreviewComponent'

// CLIENT COMPONENT

const ProductsList = ({productsList}) => {

    const [filters, setFilters] = useState({});
    const [principalFilter, setPrincipalFilter] = useState([]);
    const [initState, setInitState] = useState(undefined);

    const [loading, setLoading] = useState(false);

    // CAMBIAR EL 2000 ESTÁTICO POR EL TIEMPO DE CARGA DE LA PÁGINA EN CADA PETICIÓN

    useEffect( () => {
        setLoading(true)
        setTimeout( () => {
            setLoading(false)
        }, 2000)
    }, [principalFilter] )

    const handleFilterChange = () => {

        let filteredProducts = productsList.filter(prod => {

            let match = true;

            for(const filter in filters) {
                                
                if(Array.isArray(filters[filter])){

                // Si no está dentro de los valores de filter devuelve falso, el signo de exclamación (!) la convierte en verdadera, por lo que ingresa al if y el producto no entra al filtro ↓ ↓ ↓ .

                if((!(prod[filter] >= filters[filter][0] && prod[filter] <= filters[filter][1]))){
                    match = false;
                    break;
                } 
                continue;
            } else {

                if(filters[filter] === prod[filter]){
                    continue;
                } else {
                    match = false;
                    break;
                }
            }           
            }

         } else if (stagePet === undefined) {

            return match;
        });

        setPrincipalFilter(filteredProducts)
    }

            return (
                weightValue[0] <= prod.weight && prod.weight <= weightValue[1] &&
                brandValue === prod.brand &&
                priceValue[0] <= prod.price && prod.price <= priceValue[1] &&
                stagePet === prod.stagePet &&
                animal === prod.animal)

          }

        Object.keys(filters).map( filter => {

            if(filter === groupName){
                delete filters[groupName]
            }
        })

        handleFilterChange()
    }

return(
    <>

    <div style={{ display: 'flex', backgroundColor: 'grey', height: '8vh', width: '100vw', padding: '.5rem'}}>
        
        <ul style={{ display: 'flex', justifyContent: 'space-around', height: '100%', width: '100%'}}>
        
            <button onClick={ () => window.location.reload()}>Restablecer filtros</button>
        
            {/* FILTER BRAND */}

            <details style={{zIndex: '1'}}>
        
                <summary>Marca</summary>
                    
                    <p className='summary'>Dog Chow <input type='radio' name='brand' id='DOG CHOW' onClick={ e => filters.brand = e.target.id }/> </p>
        
                    <p className='summary'>Pedigree <input type='radio' name='brand' id='PEDIGREE' onClick={e => filters.brand = e.target.id }/></p>
        
                    <p className='summary'>Dogi <input type='radio' name='brand' id='DOGI' onClick={e => filters.brand = e.target.id }/></p>

                    <input type='button' value='reset' onClick={ () => resetRadioButtons('brand')}/>
        
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
        
                    <p className='summary'>Hasta $2000 <input type='radio' name='price' onClick={ () => filters.price = [0, 2000] }/> </p>
        
                    <p className='summary'>$2000 a $5000 <input type='radio' name='price' onClick={ () => filters.price = [2000, 5000]}/></p>
        
                    <p className='summary'>+ de $5000 <input type='radio' name='price' onClick={ () => filters.price = [5000, 100000] }/></p>

                    <input type='button' value='reset' onClick={ () => resetRadioButtons('price')}/>
        
            </details>
        
            {/* FILTER STAGE */}
        
            <details style={{zIndex: '1'}}>
                <summary>Etapa</summary>
        
                <p className='summary'>CACHORRO <input type='radio' name='stagePet' onClick={ () => filters.stagePet = 'CACHORRO'} /> </p>
        
                <p className='summary'>ADULTO <input type='radio' name='stagePet' onClick={ () => filters.stagePet = 'ADULTO'} /></p>

                <input type='button' value='reset' onClick={ () => resetRadioButtons('stagePet')}/>
        
            </details>
        
            {/* FILTER ANIMAL */}
        
            <details style={{zIndex: '1'}}>
                <summary>Animal</summary>
        
                <p className='summary'>PERRO <input type='radio' name='animal' onClick={ () => filters.animal = 'PERRO' }/> </p>
        
                <p style={{padding: '.2rem .5rem', backgroundColor: 'grey'}}>GATO <input type='checkbox' name='kg' onClick={() => setAnimal('GATO')}/></p>
        
            </details>

             <button onClick={handleFilterChange}>Buscar productos</button>
    
        </ul>
        
    </div>
            
    <div className='d-flex flex-row'>
            
        { loading 

        ?   <div className='spinner'>
                <BounceLoader color='red' loading={loading} size={100} />
            </div>

        :  principalFilter.length === 0 ? 
                
                productsList.map( (prod, key) => {
                    
                    return(
                    
                    <div className='d-flex flex-column container my-5 align-items-center' key={key}>
        
            : <h2 style={{textAlign: 'center', width: '100vw'}}>No hay coincidencias</h2>
        
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
