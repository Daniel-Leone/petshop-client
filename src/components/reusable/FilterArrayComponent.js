import React from 'react'
import { useAuthContext } from '../UseContextProvider'
import arrow from '../images/Petshop_flecha.svg'

const FilterArrayComponent = ({typeFilter, filterName, state, setState, quantFilters}) => {

    const { filters } = useAuthContext()
    
    let filtersContext;
    
    for(const filt in filters){
    
      if(filt === typeFilter){
        filtersContext = filters[filt];
      }
    }

    const deleteProperty = () => {
      delete filters[typeFilter];
    };

  return (
    <>
    <li key={filterName}>
      <div onClick={() => setState(!state)}>
        <p>{filterName}</p>
        <span className={state ? 'close-filter' : null}>
          <img src={arrow}/>
        </span>
      </div>

      <ul className={ state ? 'see-filter' : null}>

        <li>
            <p>todos</p>
            <input 
            type='radio'
            name={filterName}
            onClick={() => {
              deleteProperty()
              setState(!state) 
              }}/>
        </li>

        {
          quantFilters.map( filt => {

            const arrayFilt = [filt][0].split(' a ').map(value => parseInt(value.replace('$', ''), 10))

            return <li key={filt}>
                        <p>{filt}</p>
                        <input 
                        type='radio'
                        name={filterName}
                        onClick={() => {
                          filters[typeFilter] = arrayFilt
                          setState(!state)}}
                        defaultChecked={filters[typeFilter] ? (arrayFilt[0] === filtersContext[0] && arrayFilt[1] === filtersContext[1]) : false}
                        />
                    </li>
          } )
        }
      </ul>
    </li>
  </>
  )
}

export default FilterArrayComponent