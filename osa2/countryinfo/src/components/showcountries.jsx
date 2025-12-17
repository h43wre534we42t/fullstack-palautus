import {useState, useEffect} from 'react'
import countryService from '../services/countryservice'
import weatherService from '../services/weatherservice'

const ShowCountries = ({countryNames, country, setCountry}) => {
  const [countryData, setCountryData] = useState(null)
  const [countryWeather, setCountryWeather] = useState(null)
  const countriesToShow = countryNames.filter(countryName => countryName.toLowerCase().includes(country.toLowerCase()))
  useEffect(() => {
    if (countriesToShow.length === 1 && countryData) {
        weatherService
          .getWeather(countryData.capital[0])
          .then(response => response.data)
          .then(data => {
            setCountryWeather(data)
          })
    }
    else {
        setCountryWeather(null)
    }
  }, [countryData])
  
  useEffect(() => {
    if (countriesToShow.length === 1) {
    countryService
      .getCountry(countriesToShow[0])
      .then(response => setCountryData(response.data))
    }
    else {
        setCountryData(null)
    }
  }, [country])

  const handleButtonClick = (event) => {
    setCountry(event.target.value) 
  }

  if (countriesToShow.length > 10) {
    return(
      <p>
        Too many matches, specify another filter
      </p>
    )
  }

  if (countriesToShow.length === 1 && countryWeather) {
    if (countryData === null) {
        return('')
    }
    
    return (
      <div>
        <h1>{countryData.name.common}</h1>
        <li>Capital {countryData.capital[0]}</li>
        <li>Area {countryData.area}</li>
        <h2>Languages</h2>
        <ul>
            {Object.values(countryData.languages).map(language => <li key={language}>{language}</li>)}
        </ul>
        <img src={countryData.flags.png} alt={countryData.flags.alt} width="300"></img>
        <h1>Capital weather</h1>
        <div>
            Temperature {countryWeather.main.temp} celsius
            <img src={`https://openweathermap.org/img/wn/${countryWeather.weather[0].icon}@2x.png`} />
        </div>
      </div>
    
    )
  }
  else {
    return(
      countriesToShow.map(country => {
        return (
        <li key={country}>
          {country} <button onClick={handleButtonClick} value={country}>show</button>
        </li>
        )
      })
    )    
  }
}


export default ShowCountries