import React from 'react'

const PersonForm = ({newName, newNumber, addPerson, handleNameChange, handleNumberChange}) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        Name: <input value={newName} onChange={handleNameChange} /><br />
      </div>
      <div>
        Number: <input value={newNumber} onChange={handleNumberChange} /><br />
      </div>
      <div>
        <button type="submit">Add</button>
      </div>
    </form>
  )
}

export default PersonForm