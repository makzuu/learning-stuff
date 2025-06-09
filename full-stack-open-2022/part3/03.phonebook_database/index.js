require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')

const Person = require('./models/person')

app.use(express.static('build'))
app.use(express.json())

morgan.token('data', (req, res) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))

app.get('/api/persons', (req, res, next) => {
    Person.find({})
        .then(persons => res.json(persons))
        .catch(error => next(error))
})

app.get('/info', (req, res, next) => {
    Person.find({})
        .then(persons => {
            res.send(`<p>Phonebook has info for ${persons.length} people</p>
            <p>${new Date().toString()}</p>`)
        })
        .catch(error => next(error))
})

app.get('/api/persons/:id', (req, res, next) => {
    const id = req.params.id

    Person.findById(id)
        .then(person => res.json(person))
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

    const person = new Person({ name, number })
    person.save()
        .then(person => res.json(person))
        .catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
    const id = req.params.id
    const { name, number }  = req.body

    Person.findByIdAndUpdate(
        id,
        {name, number},
        {new: true, runValidators: true, context: 'query' }
    )
        .then(updatedNote => res.json(updatedNote))
        .catch(error => next(error))
})

const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, req, res, next) => {
    console.log(error.message, '>',error.name)

    if (error.name === 'CastError') return res.status(400).send({ error: 'malformatted id' })
    if (error.name === 'ValidationError') return res.status(400).send({ error: error.message })
    if (error.name === 'MongoServerError') return res.status(400).send({ error: error.message })
    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
