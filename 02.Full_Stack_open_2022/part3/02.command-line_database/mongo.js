const mongoose = require('mongoose')
const ARGS = process.argv

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

const makeUrl = () => {
    const password = ARGS[2]
    return `mongodb+srv://user:${password}@cluster0.benajru.mongodb.net/commandLineDatabase?retryWrites=true&w=majority`
}

const connect_and_do_stuff = stuff => {
    const url = makeUrl()
    mongoose
        .connect(url)
        .then(() => {
            stuff()
        })
        .catch(err => console.error(err))
}

const create = () => {
    connect_and_do_stuff(() => {
        const name = ARGS[3]
        const number = ARGS[4]

        const person = new Person({name, number})
        person.save()
            .then(p => {
                console.log(`added ${p.name} number ${p.number} to phonebook`)
            })
            .then(() => mongoose.connection.close())
    })
}

const read = () => {
    connect_and_do_stuff(() => {
        Person.find({})
            .then(person => {
                console.log('phonebook:')
                person.forEach(entry => {
                    console.log(entry.name, entry.number)
                })
            })
            .then(() => mongoose.connection.close())
    })
}

const message = () => {
    console.log(`syntax:
        node mongo.js <pass> <name> <number> to create a new entry to the phonebook
        node mongo.js <pass> display all the entries in the phonebook
        `)
}

if (ARGS.length === 5) {
    create()
}else if (ARGS.length === 3) {
    read()
} else {
    message()
}
