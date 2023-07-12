import React from 'react'

const Persons = ({persons, personFilter, deletePerson}) => {
  return (
    persons.length ?
      persons
        .filter(person => (
          person.name.toLowerCase().includes(personFilter.toLowerCase())))
        .map(filteredPerson => (
          <div key={filteredPerson.name}>{filteredPerson.name} {filteredPerson.number}
            <button onClick={() => deletePerson(filteredPerson.id, filteredPerson.name)}>Delete</button><br /></div>
        )
        ) : null
  )
}

export default Persons