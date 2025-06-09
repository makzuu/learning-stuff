import { useState, useEffect } from 'react'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import { Notification, Error } from './components/Notifications'

import personService from './services/persons.js'

import './App.css'

const App = () => {
    const [persons, setPersons] = useState([]) 
    const [notification, setNotification] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        personService
            .getAll()
            .then(persons => {
                setPersons(persons)
            })
    }, [])

    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setFilter] = useState('')

    const handleNewName = (event) => setNewName(event.target.value)
    const handleNewNumber = (event) => setNewNumber(event.target.value)
    const handleFilter = (event) => setFilter(event.target.value)

    const sendNotification = message => {
        setNotification(message)
        setTimeout(() => setNotification(null), 5000)
    }

    const sendError = message => {
        setError(message)
        setTimeout(() => setError(null), 5000)
    }

    const handleOnSubmit = (event) => {
        event.preventDefault()


        let person = persons.find(person => person.name.toLowerCase() === newName.toLowerCase() && person.number === newNumber)
        if (person) return alert(`${newName} is already added to phonebook`)

        person = persons.find(person => person.name.toLowerCase() === newName.toLowerCase() && person.number !== newNumber)
        if (person) {
            if (window.confirm(`${person.name} is already added to phonebook, replace the old number with a new one?`)) {
                personService
                    .update(person.id, {...person, number: newNumber})
                    .then(updatedPerson => {

                        setPersons(prev => {
                            return prev.map(p => p.id !== updatedPerson.id ? p : updatedPerson) 
                        })

                        setNewName('')
                        setNewNumber('')

                        sendNotification(`Changed ${updatedPerson.name}`)
                    })
                    .catch(error => sendError(error.response.data.error))
            }
        } else {
            const newPerson = {
                name: newName,
                number: newNumber
            }

            personService
                .create(newPerson)
                .then(person => {
                    setPersons([...persons, person])
                    setNewName('')
                    setNewNumber('')

                    sendNotification(`Added ${person.name}`)
                })
                .catch(error => sendError(error.response.data.error))
        }

    }

    const handlerDelete = (id, name) => {
        if (window.confirm(`Delete ${name}`)) {
            personService
                .deleteOne(id)
                .then(() => {
                    setPersons(prev => 
                        prev.filter(person => person.id !== id)
                    )
                    sendNotification(`Deleted ${name}`)
                })
                .catch(error =>  {
                    sendError(`Information of ${name} has already been removed from server`)
                    setPersons(prev => 
                        prev.filter(person => person.id !== id)
                    )
                })
        }
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={notification} />
            <Error error={error} />

            <Filter inputValue={filter} onChange={handleFilter} />

            <h3>add a new</h3>

            <PersonForm 
                submitHandler={handleOnSubmit} changeNameHandler={handleNewName}
                changeNumberHandler={handleNewNumber} nameState={newName} numberState={newNumber} 
            />

            <h2>Numbers</h2>

            <Persons persons={persons} filter={filter} handlerDelete={handlerDelete} />
        </div>

    )
}

export default App
