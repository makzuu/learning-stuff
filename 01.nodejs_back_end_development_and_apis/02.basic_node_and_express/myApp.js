require('dotenv').config()
let bodyParser = require('body-parser')
let express = require('express')
let app = express()

// 01.Meet the Node console
console.log('Hello World')

// 02.Start a Working Express Server
app.get("/hello", function(req, res) {
    res.send('Hello Express')
})

// 04.Serve Static Assets
app.use('/public', express.static(__dirname + '/public'))

// 07.Implement a Root-Level Request Logger Middleware
app.use((req, res, next) => {
    console.log(req.method, req.path, '-', req.ip)
    next()
})

// 03.Serve an HTML File
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/views/index.html')
})

// 05.Serve JSON on a Specific Route
// 06.Use the .env File
app.get('/json', (req, res) => {
    let msg = 'Hello json'
    if (process.env.MESSAGE_STYLE === 'uppercase') {
        msg = msg.toUpperCase()
    }
    res.json({'message': msg})
})

// 08.Chain Middleware to Create a Time Server
const getTime = (req, res, next) => {
    req.now = new Date().toString()
    next()
}
app.get('/now', getTime, (req, res) => res.json({'time': req.now}))

// 09.Get Route Parameter Input from the Client
app.get('/:word/echo', (req, res) => res.json({'echo': req.params.word}))

// 11.Use body-parser to Parse POST Requests
app.use(bodyParser.urlencoded({extended: false}))

// 12.Get Data from POST Requests
const postName = (req, res) => res.json({'name': `${req.body.first} ${req.body.last}`})

// 10.Get Query Parameter Input from the Client
const getName = (req, res) => res.json({'name': `${req.query.first} ${req.query.last}`})
app.route('/name').get(getName).post(postName)

module.exports = app
