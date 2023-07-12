import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [personFilter, setPersonFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState(null)

  const flashMessage = (msg, msgType) => {
    setMessage(msg)
    setMessageType(msgType)
    setTimeout(() => {
      setMessage(null)
      setMessageType(null)
    }, 5000)
  }

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    /* Using case-insensitive comparison to check if person exists. */
    const existingPerson = persons.find(p => p.name.toLowerCase() === newName.toLowerCase())
    if (newName === '' || newNumber === '') {
      flashMessage('Both name and number are required.', 'error')
      return
    } else if (existingPerson) {
      if (window.confirm(`${newName} is already in phonebook. Replace the old number with a new one?`)) {
        const changedPerson = { ...existingPerson, number: newNumber }
        personService
          .update(existingPerson.id, changedPerson)
          .then(response => {
            setPersons(persons.map(person => person.id !== existingPerson.id ? person :  response.data))
            setNewName('')
            setNewNumber('')
            flashMessage(`${newName}'s number updated.`, 'note')
          })
          .catch(error => {
            if (error.response.status === 404) {
              setPersons(persons.filter(function(person) { 
                return person.id !== existingPerson.id
              }))
              flashMessage(`${newName} was already removed from server.`, 'error')
            } else {
              flashMessage('An error orccurred.', 'error')
            }
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
          flashMessage(`${newName} added.`, 'note')
        })
        .catch(error => {
          console.log(error.response.data.error)
          flashMessage(error.response.data.error, 'error')
        })
    }
  }

  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService
        .deleteMe(id)
        .then(() => {
          setPersons(persons.filter(function(person) { 
            return person.id !== id
          }))
          flashMessage(`${name} deleted.`, 'note')
        })
        .catch(error => {
          if (error.response.status === 404) {
            setPersons(persons.filter(function(person) { 
              return person.id !== id
            }))
            flashMessage(`${name} was already removed from server.`, 'error')
          } else {
            flashMessage('An error orccurred.', 'error')
          }
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
      <Notification message={message} messageType={messageType} />
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