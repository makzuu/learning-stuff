require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser')

require('./src/database')
const UrlModel = require('./src/models/Url')

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});

app.use(bodyParser.urlencoded({extended: false}))

const validate = (req, res, next) => {
    const regexUrl = /https?:\/\/(www\..+|.+)/
    if (!regexUrl.test(req.body.url)) return res.json({ error: 'invalid url' })
    next()
}

app.post('/api/shorturl', validate, function(req, res) {
    const { url } = req.body
    if (!url) return res.status(400).end()

    UrlModel.findOne({url})
    .then(urlData => {
        if (!urlData) {
            const urlInstance = new UrlModel({url}) 
            urlInstance.save()
            .then(urlData => {
                const response = {original_url: urlData.url, short_url: urlData.shorturl }
                res.json(response)
            })
            .catch(err => {
                console.error(err)
                res.status(500).end()
            })
        } else {
            const response = {original_url: urlData.url, short_url: urlData.shorturl }
            res.json(response)
        }
    })
});

app.get('/api/shorturl/:shorturl', (req, res) => {
    const { shorturl } = req.params
    if (!shorturl) return res.status(400).end()

    UrlModel.findOne({shorturl})
    .then(urlData => {
        if (!urlData) {
            res.status(404).end()
        } else {
            res.redirect(urlData.url)
        }
    })
})

app.listen(port, function() {
    console.log(`Listening on port ${port}`);
});
