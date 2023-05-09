import { useState } from 'react'

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456', id: 1 },
        { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
        { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
        { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
    ])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setFilter] = useState('')

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
            <div>
                filter shown with: <input value={filter} onChange={(e) => setFilter(e.target.value)}/>
            </div>
            <h3>add a new</h3>
            <form onSubmit={handleSubmit} >
                <div>
                    name: <input value={newName} onChange={(e) => setNewName(e.target.value)}/>
                </div>
                <div>
                    number: <input value={newNumber} onChange={(e) => setNewNumber(e.target.value)}/>
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h3>Numbers</h3>
            <ul>
                { persons.filter(person =>
                    person.name.toLowerCase().includes(filter.toLowerCase())).map(person =>
                        <li key={person.name}>{person.name} {person.number}</li>) }
            </ul>
        </div>
    )
}

export default App
