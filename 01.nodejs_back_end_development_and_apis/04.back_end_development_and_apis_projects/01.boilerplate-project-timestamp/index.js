// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

require('dotenv').config()

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

const timeRegex = /^-?\d+$/

const validate = (req, res, next) => { 
    if (isNaN(Date.parse(req.params.date)) && !timeRegex.test(req.params.date)) return res.json({error: 'Invalid Date'})
    next()
}

// your first API endpoint... 
app.get("/api/:date", validate, function (req, res) {
    let obj = {unix: '', utc: ''}
    if (timeRegex.test(req.params.date)) {
        obj.unix = parseInt(req.params.date)
        obj.utc = new Date(obj.unix).toUTCString()
    } else {
        obj.unix = Date.parse(new Date(req.params.date)) 
        obj.utc = new Date(req.params.date).toUTCString()
    }
    res.json(obj)
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
