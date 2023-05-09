import { useState, useEffect } from 'react'
import axios from 'axios'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setFilter] = useState('')

    useEffect(() => {
        axios
            .get('http://localhost:3001/persons')
            .then(response => {
                setPersons(response.data)
            })
    }, [])

    const handleSubmit = e => {
        e.preventDefault()

        if (persons.find(person => person.name.toLowerCase() === newName.toLowerCase())) {
            alert(`${newName} is already added to phonebook`)
            return
        }

        setPersons([
            ...persons,
            {
                name: newName,
                number: newNumber
            }
        ])

        setNewName('')
        setNewNumber('')
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
            <Persons persons={persons} filter={filter} />
        </div>
    )
}

export default App
