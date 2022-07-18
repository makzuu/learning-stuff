require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser')
const dns = require('dns')

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

app.use((req, res, next) => {
    const { method, url } = req
    let data = req.params.shorturl
    if (method === 'POST') data = req.body.url
    const { shorturl } = req.params
    console.log(shorturl)
    
    console.log({method, url, data})
    next()
})

const validate = (req, res, next) => {
    const regexUrl = /https?:\/\/.+/
    if (!regexUrl.test(req.body.url)) return res.json({ error: 'invalid url' })
    next()
}

// Your first API endpoint
app.post('/api/shorturl', validate, function(req, res) {
    const replaceRegex = /https?:\/\//
    const { url } = req.body
    const search = url.replace(/https?:\/\//,'').replace(/\/.*$/,'')

    dns.lookup(search, (err, address) => {
        if (err) {
            console.error(err)
            return res.json(err)
        }
        UrlModel.findOne({addr: address})
        .then(urlData => {
            // save
            if (!urlData) {
                const urlInstance = new UrlModel({addr: address, url})
                urlInstance.save()
                    .then(urlData => {
                        const response = {original_url: urlData.url, short_url: urlData.shorturl}
                        console.log(response)
                        res.json(response)
                    })
                    .catch(err => {
                        console.error(err)
                        res.json({err})
                    })
            } else {
                const response = {original_url: urlData.url, short_url: urlData.shorturl}
                console.log(response)
                res.json(response)
            }
        })
        .catch(err => {
            console.error(err)
            res.json({err})
        })
    })
});

app.get('/api/shorturl/:shorturl', (req, res) => {
    const { shorturl } = req.params
    console.log(shorturl)
    UrlModel.findOne({shorturl})
    .then(urlData => {
        res.redirect(urlData.url)
    })
    .catch(err => {
        console.error(err)
        res.json({error: err})
    })
})

app.listen(port, function() {
    console.log(`Listening on port ${port}`);
});
