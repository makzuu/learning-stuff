const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()

app.use(cors())
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))

require('./src/database')
const User = require('./src/models/User')

// get all users
app.get('/api/users', (req, res) => {
    User.find({})
    .then(users => {
        res.json(users)
    })
    .catch(err => {
        console.err(err)
        res.status(500).end()
    })
})

// add a new user
app.post('/api/users', (req, res) => {
    const { username } = req.body

    if (!username) return res.status(400).end()

    User.findOne({username})
        .then(user => {
            if (!user) {
                const user = new User({username})
                user.save()
                    .then(user => {
                        const response = {"username": user.username, "_id": user._id}
                        res.json(response)
                    })
                    .catch(err => {
                        console.error(err)
                        res.status(500).end()
                    })
            } else {
                const response = {"username": user.username, "_id": user._id}
                res.json(response)
            }
        })
        .catch(err => {
            console.error(err)
            res.status(500).end()
        })

})

// add exercises 
app.post('/api/users/:id/exercises', (req, res) => {
    const { id } = req.params
    const { description, duration } = req.body
    let { date } = req.body

    console.log({id})
    console.log({description, duration, date})

    // response =>
    // {"_id":"62d8a7c51099fe0b9d8f2a56",
    // "username":"mazk",
    // "date":"Tue Oct 20 2020",
    // "duration":30,
    // "description":"sali a correr"}

    if (!id || !description || !duration) return res.status(400).end()

    date = new Date(date)


    res.status(501).end()
})

// get user exercise log
app.get('/api/users/:id/logs', (req, res) => {
    const { id } = req.params
    const { from, to, limit } = req.query

    console.log({id})
    console.log({from, to, limit})
    res.status(501).end()
})

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
