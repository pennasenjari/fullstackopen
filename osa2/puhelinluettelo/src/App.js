import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [filteredPersons, setFilteredPersons] = useState([...persons])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    /* Checking if the name exists already. Using case-insensitive comparison because
       usually the person is same regardless of the case of the letters. */
    const exists = persons.find(p => p.name.toLowerCase() === newName.toLowerCase())
    if (exists) {
      alert(`${newName} is already added to phonebook`)
      return
    } else {
      const personObj = {
        name: newName,
        number: newNumber
      }
      const newPersons = persons.concat(personObj)
      setPersons(newPersons)
      setFilteredPersons(newPersons)
      setNewName('')
      setNewNumber('')
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    const newPersons = persons.filter(
      (person) => person.name.toLowerCase().includes(event.target.value.toLowerCase())
    )
    setFilteredPersons(newPersons)
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter handleFilterChange={handleFilterChange} />
      <h2>Add a new</h2>
      <PersonForm addPerson={addPerson} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} />
    </div>
  )

}

export default App