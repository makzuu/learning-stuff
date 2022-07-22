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
const Exercise = require('./src/models/Exercise')

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

    if (!id || !description || !duration) return res.status(400).end()

    if (!date) date = new Date()
    date = new Date(date)

    const exercise = new Exercise({description, duration, date, user: id})
    exercise.save()
        .then(exercise => {
            exercise.populate('user', {username: 1})
                .then(data => {
                    const response = {
                        '_id': data.user.id,
                        username: data.user.username,
                        date: data.date.toDateString(),
                        duration: data.duration,
                        description: data.description
                    }
                    res.json(response)
                })
                .catch(err => {
                    console.error(err)
                    res.status(500).end()
                })
        })
    .catch(err => {
        console.error(err)
        res.status(500).end()
    })
})

// get user exercise log
app.get('/api/users/:id/logs', (req, res) => {
    const { id } = req.params
    const { from, to, limit } = req.query

    console.log({id})
    console.log({from, to, limit})

    if (!id) return res.status(400).end()
    // buscar todos los logs
    if (!from || !to || !limit) {
        Exercise.find({user: id}).populate('user', {username: 1})
        .then(data => {

            // {
            //   username: "fcc_test",
            //   count: 1,
            //   _id: "5fb5853f734231456ccb3b05",
            //   log: [{
            //     description: "test",
            //     duration: 60,
            //     date: "Mon Jan 01 1990",
            //   }]
            // }
            const log = {
                username: '',
                count: 0,
                _id: '',
                log: []
            }

            const response = data.reduce((acc, el, i) => {
                if (i === 0) {
                    return {
                        username: el.user.username,
                        count: i+1,
                        _id: el.id,
                        log: [{
                            date: el.date.toDateString(),
                            duration: el.duration,
                            description: el.description
                        }]
                    }
                }
                acc.count = i+1
                acc.log.push({
                    date: el.date.toDateString(),
                    duration: el.duration,
                    description: el.description
                })
                return acc
            }, {})
            
            res.json(response)
        })
    } else { // buscar los logos con los filtros from, to, limit
    }

})

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
