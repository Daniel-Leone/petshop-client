import React from 'react'
import { useAuthContext } from '../UseContextProvider'
import arrow from '../images/Petshop_flecha.svg'

const FilterComponent = ({typeFilter, filterName, state, setState, quantFilters}) => {

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
          }}
          />
        </li>

        {
          quantFilters.map( filt => {

            let filtUpCase = filt.toUpperCase();

          return <li key={filt}>
                    <p>{filt}</p>
                    <input 
                    type='radio'
                    name={filterName}
                    id={filtUpCase}
                    onClick={e => {
                      filters[typeFilter] = e.target.id
                      setState(!state)
                    }}
                    defaultChecked={filtUpCase === filtersContext}/>
                  </li>
          } )
        }
      </ul>
    </li>
  </>
  )
}

export default FilterComponent