import React from 'react'

const FormProduct = (props) => {

    const { 
        setAnimal, 
        setBrand, 
        setDescription, 
        setPrice, 
        setStagePet, 
        setTitle, 
        setWeight, 
        title, 
        price, 
        description, 
        weight } = props;

  return (
    
    <>
        <details>

            <summary>Marca</summary>

            <p> Dog Chow <input type='radio' name='brand' id='DOG CHOW' onClick={e => setBrand(e.target.id)}/> </p>
            <p> Pedigree <input type='radio' name='brand' id='PEDIGREE' onClick={e => setBrand(e.target.id)}/>  </p>
            <p> Dogi <input type='radio' name='brand' id='DOGI' onClick={e => setBrand(e.target.id)}/>  </p>

        </details>

        <details>

            <summary>Animal</summary>

            <p>PERRO <input type='radio' name='animal' onClick={ () => setAnimal('PERRO') }/> </p>
            <p>GATO <input type='radio' name='animal' onClick={() => setAnimal('GATO')}/></p>

        </details>

        <details style={{zIndex: '1'}}>

            <summary>Etapa</summary>

            <p>CACHORRO <input type='radio' name='stagePet' onClick={ () => setStagePet('CACHORRO') }/> </p>
            <p>ADULTO <input type='radio' name='stagePet' onClick={ () => setStagePet('ADULTO')}/></p>

        </details>

        <div className="form-group">
            <label htmlFor="title">Título</label>
            <input 
            type="text"
            className="form-control"
            placeholder='nombre del producto'
            onChange={e => setTitle(e.target.value)}
            value={title}
            />
        </div>

        <div className="form-group">
            <label htmlFor="description">Descripción</label>
            <textarea
            rows='3'
            className="form-control"
            placeholder='descripción'
            onChange={e => setDescription(e.target.value)}
            value={description}
            />
        </div>

        <div className="form-group">
            <label htmlFor="price">Precio</label>
            <input
            type="number"
            className="form-control"
            placeholder='precio'
            onChange={ e => setPrice(e.target.value) }
            value={price}
            />
        </div>

        <div className="form-group">
            <label htmlFor="weight">Peso</label>
            <input
            type="number"
            className="form-control"
            placeholder='peso'
            onChange={ e => setWeight(e.target.value) }
            value={weight}
            />
        </div>
    </>

  )
}

export default FormProduct