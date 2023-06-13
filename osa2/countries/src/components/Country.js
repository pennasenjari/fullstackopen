const Country = ({filteredCountries}) => {

  const flagStyle = {
    border: '1px #000 solid'
  }

  return (
    filteredCountries.length < 1 || filteredCountries.length > 1 ?
      null
    :
      <div>
        <h1>{filteredCountries[0].name.common}</h1>
        Capital: {filteredCountries[0].capital}<br />
        Area: {filteredCountries[0].area} &#13218;<br />
        Languages:
        <ul>
          {Object.keys(filteredCountries[0].languages).map(key => (
            <li key={key}>{filteredCountries[0].languages[key]}</li>
          ))}
        </ul>
        <img src={filteredCountries[0].flags['png']} alt={filteredCountries[0].name.common} style={flagStyle}></img>
      </div> 
  )
}

export default Country