const Filter = ({handleFilterChange, countryFilter}) => {
  return (
    <p>Find countries <input onChange={handleFilterChange} value={countryFilter} /></p>
  )

}

export default Filter