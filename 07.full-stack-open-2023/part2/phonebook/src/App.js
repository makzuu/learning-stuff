import { useState, useEffect } from 'react'
import personService from './services/persons'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

import './style.css'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setFilter] = useState('')
    const [notification, setNotification] = useState(null)

    useEffect(() => {
        personService
            .getAll()
            .then(persons => setPersons(persons))
    }, [])

    const handleSubmit = e => {
        e.preventDefault()

        const person = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())
        if (person) {
            const answer = window.confirm(`${person.name} is already added to phonebook, replace the old number with a new one?`)
            if (answer)
                personService
                    .update({ id: person.id, name: newName, number: newNumber })
                    .then(updatedPerson => {
                        setPersons(persons.map(person => person.id !== updatedPerson.id ? person : updatedPerson))

                        setNewName('')
                        setNewNumber('')

                        setNotification('Modified!')
                        setTimeout(() => setNotification(null), 5000)
                    })
            return
        }

        personService
            .create({ name: newName, number: newNumber })
            .then(newPerson => {
                setPersons([...persons, newPerson])

                setNewName('')
                setNewNumber('')

                setNotification(`Added ${newPerson.name}`)
                setTimeout(() => setNotification(null), 5000)
            })
    }

    const deletePerson = id => {
        const person = persons.find(person => person.id === id)
        const answer = window.confirm(`Delete ${person.name}?`)
        if (answer)
            personService
                .remove(id)
                .then(() => {
                    setPersons(persons.filter(person => person.id !== id))

                    setNotification('Deleted!')
                    setTimeout(() => setNotification(null), 5000)
                })
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={notification} />
            <Filter value={filter} handleChange={e => setFilter(e.target.value)}/>
            <h3>add a new</h3>
            <PersonForm handleSubmit={handleSubmit} newName={newName} newNumber={newNumber}
                handleNewName={e => setNewName(e.target.value)}
                handleNewNumber={e => setNewNumber(e.target.value)} />
            <h3>Numbers</h3>
            <Persons persons={persons} filter={filter} deletePerson={deletePerson}/>
        </div>
    )
}

export default App
