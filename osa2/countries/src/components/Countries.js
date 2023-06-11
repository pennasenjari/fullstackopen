const Countries = ({countries, countryFilter, showCountry}) => {

  const flagStyle = {
    border: '1px #000 solid'
  }

  const filteredCountries = countries.filter(country => (
    country.name.common.toLowerCase().includes(countryFilter.toLowerCase())))

  return (
    filteredCountries.length > 10 ?
      <div>Too many matches, specify another filter</div> 
    : filteredCountries.length === 1 ?
      <div>
        <h1>{filteredCountries[0].name.common}</h1>
        Capital: {filteredCountries[0].capital}<br />
        Area: {filteredCountries[0].area} &#13218;<br />
        Languages:
        <ul>
          {Object.keys(filteredCountries[0].languages).map(key => (
            <li>{filteredCountries[0].languages[key]}</li>
          ))}
        </ul>
        <img src={filteredCountries[0].flags['png']} alt={filteredCountries[0].name.common} style={flagStyle}></img>
      </div> 
    : filteredCountries
      .map(filteredCountry => (
        <div key={filteredCountry.name.common}>{filteredCountry.name.common}
        <button onClick={() => showCountry(filteredCountry.name.common)}>Show</button><br /></div>
      )
    )
  )
}

export default Countries