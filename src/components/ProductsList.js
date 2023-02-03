import React, { useState, useEffect } from 'react'
import whatsAppIcon from './images/whatsapp-icon.png'
import BounceLoader from 'react-spinners/BounceLoader'
import PreviewComponent from './PreviewComponent'

import { useAuthContext } from './UseContextProvider'

// CLIENT COMPONENT

const ProductsList = ({productsList}) => {

    const [filters, setFilters] = useState({});
    const [initState, setInitState] = useState(false);
    const [loading, setLoading] = useState(false);

    const [loadTime, setLoadTime] = useState(0)

    const { principalFilter, setPrincipalFilter } = useAuthContext()

    // CAMBIAR EL 2000 ESTÁTICO POR EL TIEMPO DE CARGA DE LA PÁGINA EN CADA PETICIÓN

    let time = performance.getEntriesByType("navigation")[0];
    let loadEnd = time.connectEnd - time.connectStart;

    useEffect( () => {
        setLoading(true)
        setTimeout( () => {
            setLoading(false)
        }, loadEnd)
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

            if(!match) setInitState(true);

            return match;
        });

        setPrincipalFilter(filteredProducts)
    }

    const resetRadioButtons = (groupName) => {
        let radioBtn = document.getElementsByName(groupName);
    
        for (let i = 0; i < radioBtn.length; i++) {
            let radButton = radioBtn[i];
            radButton.checked = false;
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
        
                    <p className='summary'>1kg a 10kg <input type='radio' name='weight' onClick={ () => filters.weight = [1, 10] }/> </p>
        
                    <p className='summary'>11kg a 20kg <input type='radio' name='weight' onClick={() => filters.weight = [11, 20] }/></p>
        
                    <p className='summary'>+ de 20kg <input type='radio' name='weight' onClick={() => filters.weight = [21, 100] }/></p>

                    <input type='button' value='reset' onClick={ () => resetRadioButtons('weight')}/>
        
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
        
                <p className='summary'>GATO <input type='radio' name='animal' onClick={() => filters.animal = 'GATO' }/></p>

                <input type='button' value='reset' onClick={ () => resetRadioButtons('animal')}/>
        
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
                
           !initState

            ? <PreviewComponent iteratefunction={productsList}/>
        
            : <h2 style={{textAlign: 'center', width: '100vw'}}>No hay coincidencias</h2>
        
        : <PreviewComponent iteratefunction={principalFilter}/>   
         
        } 
        
        <img src={whatsAppIcon} alt='whatsapp-icon' className="btn" style={{position:'fixed', right: '2vw', bottom: '2vh'}} />
                    
    </div>
    </>
)
}

export default ProductsList
