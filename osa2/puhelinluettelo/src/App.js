import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [personFilter, setPersonFilter] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    /* Checking if the name exists already. Using case-insensitive comparison. */
    const existingPerson = persons.find(p => p.name.toLowerCase() === newName.toLowerCase())
    if (newName === '' || newNumber === '') {
      alert(`Name or number is empty`)
      return
    } else if (existingPerson) {
      if (window.confirm(`${newName} is already in phonebook. Replace the old number with a new one?`)) {
        const changedPerson = { ...existingPerson, number: newNumber }
        personService
          .update(existingPerson.id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== existingPerson.id ? person : returnedPerson))
            setNewName('')
            setNewNumber('')
          })
          .catch(error => {
            alert(`Update failed`)
          })
      }
      return
    } else {
      const personObj = {
        name: newName,
        number: newNumber
      }
      personService
        .create(personObj)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService
        .deleteMe(id)
        .then((response) => {
          setPersons(persons.filter(function(person) { 
            return person.id !== id
          }))
        })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setPersonFilter(event.target.value)
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter handleFilterChange={handleFilterChange} />
      <h2>Add a new</h2>
      <PersonForm newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} 
        handleNumberChange={handleNumberChange} addPerson={addPerson} />
      <h2>Numbers</h2>
      <Persons persons={persons} personFilter={personFilter} deletePerson={deletePerson} />
    </div>
  )
}

export default App