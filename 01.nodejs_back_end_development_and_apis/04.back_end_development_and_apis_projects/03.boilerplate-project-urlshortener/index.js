require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser')
const dns = require('dns')
const mongoose = require('mongoose')

const UrlModel = require('./models/Url.js')

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});

app.use(bodyParser.urlencoded({extended: false}))

const validate = (req, res, next) => {
    const regexUrl = /^https?:\/\/www\.\w+\.\w{2,3}\/?$/
    if (!regexUrl.test(req.body.url)) {
        return res.json({ error: 'invalid url' })
    }
    next()
}

// Your first API endpoint
app.post('/api/shorturl', validate, function(req, res) {
    const url = req.body.url
    const index = url.indexOf('.')
    const search = url.substring(index + 1)
    dns.lookup(search, (err, address) => {
        if (err) {
            return console.error(err)
        } 

        UrlModel.findOne({addr: address})
            .exec()
            .then(urlData => {
                // save
                if (!urlData) {
                    const urlInstance = new UrlModel({addr: address, url})
                    urlInstance.save()
                        .then(urlData => {
                            const response = {original_url: urlData.url, short_url: urlData.shorturl}
                            res.json(response)
                        })
                } else {
                    const response = {original_url: urlData.url, short_url: urlData.shorturl}
                    res.json(response)
                }
            })
    })
});

app.get('/api/shorturl/:shorturl', (req, res) => {res.send('<p>in progress</p>')})

app.listen(port, function() {
    console.log(`Listening on port ${port}`);
});
