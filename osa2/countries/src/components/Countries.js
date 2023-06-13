const Countries = ({filteredCountries, countryFilter, setCountryFilter}) => {

  const buttonStyle = {
    margin: 4
  }

  return (
    countryFilter.length < 1 ?
      null
    : filteredCountries.length < 1 ?
      <div>No matches, specify another filter</div> 
    : filteredCountries.length > 10 ?
      <div>Too many matches, specify another filter</div> 
    : filteredCountries.map(filteredCountry => (
        <div key={filteredCountry.name.common}>{filteredCountry.name.common}
        <button onClick={() => setCountryFilter(filteredCountry.name.common)} style={buttonStyle}>Show</button><br /></div>
      )
    )
  )
}

export default Countries