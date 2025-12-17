import {useState, useEffect} from 'react'
import countryService from './services/countryservice'
import ShowCountries from './components/showcountries'

const App = () => {
  const [country, setCountry] = useState('')
  const [countryNames, setCountryNames] = useState([])

  useEffect(() => {
      countryService
        .getAll()
        .then(response => {
          setCountryNames(response.data.map(country => country.name.common))
        })
  }, [])

  useEffect(() => {

  })
  
  const handleCountryChange = (event) => {
    setCountry(event.target.value)
  }
  
  return(
    <div>
      <p>
        filter by country name <input value={country} onChange={handleCountryChange}/>
      </p>
      <div>
      <ShowCountries countryNames={countryNames} country={country} setCountry={setCountry}/>
      </div>
    </div>
  )

}

export default App