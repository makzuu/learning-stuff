const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

let persons = [
    { 
        "id": 1,
        "name": "Arto Hellas", 
        "number": "040-123456"
    },
    { 
        "id": 2,
        "name": "Ada Lovelace", 
        "number": "39-44-5323523"
    },
    { 
        "id": 3,
        "name": "Dan Abramov", 
        "number": "12-43-234345"
    },
    { 
        "id": 4,
        "name": "Mary Poppendieck", 
        "number": "39-23-6423122"
    }
]

const generateId = () => Math.floor(Math.random() * 10000) 

app.use(express.static('build'))
app.use(cors())
app.use(express.json())

morgan.token('data', (req, res) => JSON.stringify(req.body)
)
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/info', (req, res) => {
    res.send(`<p>Phonebook has info for ${persons.length} people</p>
        <p>${new Date().toString()}</p>`)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)

    if (!person) return res.status(404).json({code: 404, message: 'not found'})
    res.json(person)
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)

    persons = persons.filter(person => person.id !== id)

    res.status(204).json({status: 204, message: 'no content'})
})

app.post('/api/persons', (req, res) => {
    const newPerson = req.body
    
    if (!newPerson.name || !newPerson.number) return res.status(400).json({status: 400, message: 'bad request', desc: '\'name\' and \'number\' fields are required'})
    if (persons.find(person => person.name === newPerson.name)) return res.status(400).json({error: 'name must be unique'})

    newPerson.id = generateId()
    persons = [...persons, newPerson]

    res.json(newPerson)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
