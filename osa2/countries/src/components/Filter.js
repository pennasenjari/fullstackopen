const Filter = ({handleFilterChange, countryFilter, setCountryFilter}) => {

  const inputStyle = {
    margin: 4
  }

  return (
    <div>Find a country
      <input onChange={handleFilterChange} value={countryFilter} placeholder="Type a country name" style={inputStyle} />
      <button onClick={() => setCountryFilter('')}>Clear</button>
    </div>
  )

}

export default Filter