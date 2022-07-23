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

app.get('/api/users/:id/logs', (req, res) => {
    const { id } = req.params
    const { from, to, limit } = req.query

    if (!id) return res.status(400).json({error: 'bad request'})

    let filter = {user: id}
    let options = {}
    if (!!from && !!to) {
        filter.date = {$gte: new Date(from), $lte: new Date(to)}
    }
     if (!!limit) options.limit = +limit

    Exercise.find(filter, null, options).populate('user', {username: 1})
        .then(data => {
            const response = data.reduce((acc, el, i) => {
                if (i === 0) {
                    acc.username = el.user.username
                    acc.count = i+1
                    acc._id = el.id
                    acc.log = [{
                        description: el.description,
                        duration: el.duration,
                        date: el.date.toDateString()
                    }]
                    return acc
                }
                acc.count = i+1
                acc.log.push({
                    description: el.description,
                    duration: el.duration,
                    date: el.date.toDateString()
                })
                return acc
            }, {})

            console.log(response)
            res.json(response)
        })
    .catch(err => {
        console.error(err)
        res.status(500).json({error: 'internal server error'})
    })
})

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
