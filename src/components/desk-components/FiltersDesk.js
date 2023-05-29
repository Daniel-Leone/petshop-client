import React, { useState } from 'react'
import FilterArrayComponent from '../reusable/FilterArrayComponent'
import FilterTxtComponent from '../reusable/FilterTxtComponent'

import { useAuthContext } from '../UseContextProvider'

const FiltersDesk = () => {

  const [filtPetVisible ,setFiltPetVisible] = useState(false);
  const [filtBrandVisible ,setFiltBrandVisible] = useState(false);
  const [filtWeightVisible ,setFiltWeightVisible] = useState(false);
  const [filtPriceVisible ,setFiltPriceVisible] = useState(false);
  const [filtAgeVisible ,setFiltAgeVisible] = useState(false);

  const { productsList, filters, setPrincipalFilter, principalFilter, setInitState } = useAuthContext()

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
      setInitState(true)
  }

  return (
    <div className='filters-desk'>
        <p className='title-section'>FILTROS</p>
      <div className= 'filters-on filters'>

        <ul className='filters-container'>
            <FilterTxtComponent typeFilter='pet' filterName='Mi mascota es:' state={filtPetVisible} setState={setFiltPetVisible} quantFilters={ ['perro', 'gato', 'pez'] }/>

            <FilterTxtComponent typeFilter='age' filterName='Su edad es:' state={filtAgeVisible} setState={setFiltAgeVisible} quantFilters={ ['cachorro', 'adulto'] }/>

            <FilterTxtComponent typeFilter='brand' filterName='Elegir marca:' state={filtBrandVisible} setState={setFiltBrandVisible} quantFilters={ ['Dog Chow', 'Pedigree', 'Dogi'] }/>

            <FilterArrayComponent typeFilter='price' filterName='Elegir por precio:' state={filtPriceVisible} setState={setFiltPriceVisible} quantFilters={ ['$0 a  $2000', '$2000 a $5000', '$5000 a $20000'] }/>

            <FilterArrayComponent typeFilter='weight' filterName='Elegir por peso:' state={filtWeightVisible} setState={setFiltWeightVisible} quantFilters={ ['1kg a 10kg', '11kg a 20kg', '20kg a 100kg'] }/>
        </ul>

        <div className='btns'>
            <button onClick={handleFilterChange} className='add'>APLICAR FILTROS</button>
        </div>

      </div>
    </div>
  )
}

export default FiltersDesk