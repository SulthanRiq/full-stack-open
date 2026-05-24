import { useState, useEffect } from "react";
import axios from 'axios'
import personsService from "./services/persons-service";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([
    { id: 0, name: '', number: '' }
  ])
  const [newName, setNewName] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [newNumber, setNewNumber] = useState('')
  const [message, setMessage] = useState(true)

  useEffect(() => {
    personsService
      .getAll()
      .then(response => {
        setPersons(response)
      })
  }, [])

  const addNewName = (event) => {
    event.preventDefault()
    
    const result = persons.find(person => 
      person.name === newName.trim()
    )

    const personObject = {
      name: newName,
      number: newNumber,
    }

    if (!result) {
      personsService
        .create(personObject)
        .then((response => {
          setPersons((prevPersons) => prevPersons.concat(response))
          setNewName('')
          setNewNumber('')
        }))
        setMessage(
          `Added ${newName}`
        )
        setTimeout(() => {
          setMessage(null)
        }, 3000)
    } else {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        personsService
          .update(result.id, personObject)
          .then(() => {
            setPersons((prevPersons) => 
              prevPersons.map((person) => 
                person.id === result.id ? personObject : person
              )
            )
            setNewName('')
            setNewNumber('')
          })
      }
    }

    console.log('button clicked', event.target)
  }

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name}`)) {
      personsService
        .delete_person(id)
        .then(() => {
          setPersons((prevPersons) => 
            prevPersons.filter((person) => person.id !== id)
          )
        })
    }
  }

  const handleAddName = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleAddNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const personToShow = showAll ? persons : persons.filter((person => person.name))

  return (
    <>
      <h2>Phonebook</h2>

      <Notification message={message}/>

      <PersonForm 
        onSubmit={addNewName} value={{newName, newNumber}} onChange={{handleAddName, handleAddNumber}} 
      />

      <h3>Numbers</h3>
      <Persons allPersons={personToShow} handleDelete={handleDelete}/>
    </>
  )

}

export default App