const mongoose = require('mongoose')

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 5) {
    const password = process.argv[2]
    const name = process.argv[3]
    const number = process.argv[4]

    connect(password)
    save(name, number)
} else if (process.argv.length === 3) {
    const password = process.argv[2]
    connect(password)
    findAll()
}

function connect(password) {
    const database = 'phonebook'
    const url = `mongodb+srv://makz:${password}@cluster0.krubbqw.mongodb.net/${database}?retryWrites=true&w=majority`

    mongoose.connect(url)
}

function save(name, number) {
    const person = new Person({ name, number })
    person.save().then(result => {
        console.log(`added ${result.name} number ${result.number} to phonebook`)
        mongoose.connection.close()
    })
}

function findAll() {
    Person.find({}).then(results => {
        console.log('phonebook:')
        results.forEach(person => {
            console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
    })
}
