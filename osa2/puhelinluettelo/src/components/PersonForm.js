const PersonForm = ({addPerson, handleNameChange, handleNumberChange}) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        Name: <input onChange={handleNameChange} /><br />
      </div>
      <div>
        Number: <input onChange={handleNumberChange} /><br />
      </div>
      <div>
        <button type="submit">Add</button>
      </div>
    </form>
  )
}

export default PersonForm