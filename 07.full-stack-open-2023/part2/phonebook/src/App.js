import { useState, useEffect } from 'react'
import personService from './services/persons'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setFilter] = useState('')

    useEffect(() => {
        personService
            .getAll()
            .then(persons => setPersons(persons))
    }, [])

    const handleSubmit = e => {
        e.preventDefault()

        if (persons.find(person => person.name.toLowerCase() === newName.toLowerCase())) {
            alert(`${newName} is already added to phonebook`)
            return
        }

        personService
            .create({ name: newName, number: newNumber })
            .then(newPerson => {
                setPersons([...persons, newPerson])

                setNewName('')
                setNewNumber('')
            })
    }

    const deletePerson = id => {
        const person = persons.find(person => person.id === id)
        const answer = window.confirm(`Delete ${person.name}?`)
        if (answer)
            personService
                .remove(id)
                .then(() => setPersons(persons.filter(person => person.id !== id)))
    }

    return (
        <div>
            <h2>Phonebook</h2>
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
