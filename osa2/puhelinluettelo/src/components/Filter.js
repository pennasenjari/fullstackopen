import React from 'react'

const Filter = ({handleFilterChange}) => {
  return (
    <p>Filter shown with <input onChange={handleFilterChange} /></p>
  )

}

export default Filter