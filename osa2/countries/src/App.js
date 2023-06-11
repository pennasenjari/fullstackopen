import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Countries from './components/Countries'
import countryService from './services/countries'

const App = () => {

  const [countries, setCountries] = useState([])
  const [countryFilter, setCountryFilter] = useState('')

  const handleFilterChange = (event) => {
    setCountryFilter(event.target.value)
  }

  const showCountry = (name) => {
    setCountryFilter(name)
  }

  useEffect(() => {
    countryService
      .getAll()
      .then(allCountries => {
        setCountries(allCountries)
      })
  }, [countryFilter])

  return (
    <div className="App">
      <header className="App-header">
        <Filter handleFilterChange={handleFilterChange} countryFilter={countryFilter} />
        <Countries countries={countries} countryFilter={countryFilter} showCountry={showCountry} />
      </header>
    </div>
  );
}

export default App
