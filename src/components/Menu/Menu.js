import React from 'react'
import "./Menu.css"
import CityList from '../CityList/CityList'

const Menu = ({ cities, setCity, addCity }) => {
  return (
	<div className='menu'>
		<button onClick={() => addCity(prompt('Entrez le nom de la ville:'))}>Ajout</button>
        <CityList cities={cities} setCity={setCity} />
	</div>
  )
}

export default Menu