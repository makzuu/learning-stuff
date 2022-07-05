require('dotenv').config();
let express = require('express');
let app = express();

console.log('Hello World');

// app.get("/", function(req, res) {
//     res.send('Hello Express');
// });

app.use('/public', express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/views/index.html')
});

const message = process.env.MESSAGE_STYLE === 'uppercase' ? {'message': 'HELLO JSON'} : {'message': 'Hello json'};
app.get('/json', (req, res) => res.json(message));

module.exports = app;
