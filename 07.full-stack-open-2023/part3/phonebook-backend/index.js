require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

const Person = require('./models/person')

app.use(cors())
app.use(express.static('build'))
app.use(express.json())

morgan.token('body', (req, res) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.get('/api/persons', (req, res, next) => {
    Person.find({})
        .then(persons => res.json(persons))
        .catch(error => next(error))
})

app.get('/info', (req, res, next) => {
    const date = new Date()

    Person.find({})
    .then(persons => res.send(`Phonebook has info for ${persons.length} people</br>${date}`))
    .catch(error => next(error))
})

app.get('/api/persons/:id', (req, res, next) => {
    const id = req.params.id
    Person.findById(id)
        .then(person => {
            if (person)
                return res.json(person)
            res.status(404).end()
        }) 
        .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
    const id = req.params.id
    Person.findByIdAndRemove(id)
        .then(result => res.status(204).end())
        .catch(error => next(error))
})

app.post('/api/persons', (req, res, next) => {
    const { name, number } = req.body

    if (!name || !number)
        return res.status(400).json({ error: 'name or number missing' })

    const newPerson = new Person({ name, number })

    newPerson.save()
    .then(savedPerson => res.status(201).json(savedPerson))
    .catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
    const id = req.params.id
    const { name, number } = req.body

    if (!name || !number)
        return res.status(400).json({ error: 'name or number missing' })

    Person.findByIdAndUpdate(id, { name, number }, { new: true, runValidators: true })
    .then(updatedPerson => res.json(updatedPerson))
    .catch(error => next(error))
})

const errorHandler = (error, req, res, next) => {
    console.error(error)

    if (error.name === 'CastError')
        return res.status(400).json({ error: 'malformatted id' })

    if (error.name === 'ValidationError')
        return res.status(400).json({ error: error.message })

    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))
