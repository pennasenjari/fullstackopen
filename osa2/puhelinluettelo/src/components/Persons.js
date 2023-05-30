const Persons = ({filteredPersons}) => {
  return (
    filteredPersons.map((person) => 
      <div key={person.name}>{person.name} {person.number}<br /></div>
    )
  )
}

export default Persons