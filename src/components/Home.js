import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import FilterArrayComponent from './reusable/FilterArrayComponent'
import FilterTxtComponent from './reusable/FilterTxtComponent'
import arrow from './images/Petshop_flecha.svg'
import notFound from './images/Petshop_sin-resultados.svg'
import Navbar from './Navbar'

import { useAuthContext } from './UseContextProvider'

import Footer from './reusable/Footer'
import CartDesk from './desk-components/CartDesk'
import FiltersDesk from './desk-components/FiltersDesk'
import HomeDesk from './desk-components/HomeDesk'

const Home = () => {

    const [stateFilter, setStateFilter] = useState(false)
    const [filtPetVisible ,setFiltPetVisible] = useState(false);
    const [filtBrandVisible ,setFiltBrandVisible] = useState(false);
    const [filtWeightVisible ,setFiltWeightVisible] = useState(false);
    const [filtPriceVisible ,setFiltPriceVisible] = useState(false);
    const [filtAgeVisible ,setFiltAgeVisible] = useState(false);

    const { productsList, filters, setPrincipalFilter, principalFilter, initState, setInitState } = useAuthContext()

    const handleFilterChange = e => {

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

            return match;
        });

        setPrincipalFilter(filteredProducts);
        setStateFilter(false)
        setInitState(true)
    }

  return (
    <>

        <div className='grid-desk-container'>
            <Navbar/>
            <CartDesk/>
            <HomeDesk/>
            <FiltersDesk/>
            <Footer/>
        </div>

        <div className='product-lists'>

            <Navbar/>

            <div className='filters-on-page'>
                <div onClick={ () => setStateFilter(true) }>
                    <p>FILTRAR</p>
                    <img src={arrow} alt='arrow'/>
                </div>
            </div>

            <div className='catalogContainer'>
            { 
            principalFilter.length === 0 ?
                !initState ?
                    productsList.map( (prod, key) => {
                        
                        return (
                        
                        <div className='big-prod'> 
                        
                            <div className='product-container' key={key}>
                    
                                <div className='img-container'>
                                    <img src={`${prod.productImage}`} alt={prod.productImage}/>
                                </div>

                                <div className='info-product'>

                                    <h2>{prod.title}</h2>
                                    <p>para: {prod.age.toLowerCase()}</p>
                                    <p>{prod.weight} kg.</p>
                                    <span className='price'>${prod.price}</span>
                                    <p className='sale'>SIN STOCK</p>
                            
                                    <div className='btns'>
                                        <Link to={{
                                                pathname: `/product/${prod._id}`}}
                                                className='add'>AGREGAR
                                        </Link>
                                    </div>
                            
                                </div>
                            </div>

                            <div className='footer-prod'></div>              
                        </div> 
                        )
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
                    return (   
                    <div className='big-prod'> 
                    
                        <div className='product-container' key={key}>
                
                            <div className='img-container'>
                                <img src={`${prod.productImage}`} alt={prod.productImage}/>
                            </div>

                            <div className='info-product'>

                                <h2>{prod.title}</h2>
                                <p>para: {prod.age.toLowerCase()}</p>
                                <p>{prod.weight} kg.</p>
                                <span className='price'>${prod.price}</span>
                                <p className='sale'>SIN STOCK</p>
                        
                                <Link to={{
                                        pathname: `/product/${prod._id}`}}
                                        className='add'>AGREGAR
                                </Link>
                        
                            </div>
                        </div>

                        <div className='footer-prod'></div>              
                    </div> 
                    )
                }
                )
            }
            <p className='end-results'>Fin de los resultados para esta búsqueda.</p>
            </div>
            <Footer/>

            <div className= {stateFilter ? 'filters-on filters' : 'filters-off filters'}>

                <ul className='filters-container'>
                    <FilterTxtComponent typeFilter='pet' filterName='Mi mascota es:' state={filtPetVisible} setState={setFiltPetVisible} quantFilters={ ['perro', 'gato', 'pez'] }/>

                    <FilterTxtComponent typeFilter='age' filterName='Su edad es:' state={filtAgeVisible} setState={setFiltAgeVisible} quantFilters={ ['cachorro', 'adulto'] }/>

                    <FilterTxtComponent typeFilter='brand' filterName='Elegir marca:' state={filtBrandVisible} setState={setFiltBrandVisible} quantFilters={ ['Dog Chow', 'Pedigree', 'Dogi'] }/>

                    <FilterArrayComponent typeFilter='price' filterName='Elegir por precio:' state={filtPriceVisible} setState={setFiltPriceVisible} quantFilters={ ['$0 a  $2000', '$2000 a $5000', '$5000 a $20000'] }/>

                    <FilterArrayComponent typeFilter='weight' filterName='Elegir por peso:' state={filtWeightVisible} setState={setFiltWeightVisible} quantFilters={ ['1kg a 10kg', '11kg a 20kg', '20kg a 100kg'] }/>
                </ul>

                <div className='btns'>
                    <button onClick={handleFilterChange} className='add'>APLICAR FILTROS</button>
                    <button onClick={ () => setStateFilter(false) } className='add'>VOLVER</button>
                </div>

            </div>
        </div>
    </>

  )
}

export default Home