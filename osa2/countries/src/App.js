import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Countries from './components/Countries'
import Country from './components/Country'
import Weather from './components/Weather'
import countryService from './services/countries'

const App = () => {

  const WEATHERMAP_APPID = process.env.REACT_APP_OPENWEATHERMAP_APPID  
  const [countries, setCountries] = useState([])
  const [countryFilter, setCountryFilter] = useState('')
  const [filteredCountries, setFilteredCountries] = useState([])
  const [latlng, setLatlng] = useState([])
  const [weather, setWeather] = useState([])

  useEffect(() => {
    /* Load all countries at first render */
    countryService
      .getAll()
      .then(allCountries => {
        setCountries(allCountries)
        setFilteredCountries(allCountries)
      })
  }, [])

  useEffect(() => {
    /* Filter countries when filter text changes */
    const newCountries = countries.filter(country => (
      country.name.common.toLowerCase().includes(countryFilter.toLowerCase())))
    // Memorize filtered countries
    setFilteredCountries(newCountries)
    if (newCountries.length === 1) {
      // If filtering result is a single country, trigger loading weather forecast
      setLatlng(newCountries[0].latlng)
    } else {
      // Clear old forecast
      setLatlng([])
      setWeather([])
    }
  }, [countries, countryFilter])

  useEffect(() => {
    /* Get weather forecast when latlng changes */
    if (latlng.length === 2) {
      try {
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latlng[0]}&lon=${latlng[1]}&appid=${WEATHERMAP_APPID}&units=metric`
        axios.get(url).then(response => {
          setWeather(response.data)
        })
      } catch (e) {
        console.error(e);
      }
    }
  }, [latlng, WEATHERMAP_APPID])

  const handleFilterChange = (event) => {
    setCountryFilter(event.target.value)
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Country Information</h1>
        <Filter handleFilterChange={handleFilterChange} countryFilter={countryFilter} setCountryFilter={setCountryFilter} />
        <Countries filteredCountries={filteredCountries} countryFilter={countryFilter} setCountryFilter={setCountryFilter} />
        <Country filteredCountries={filteredCountries} />
        <Weather weather={weather} />
      </header>
    </div>
  );
}

export default App