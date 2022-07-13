const mongoose = require('mongoose')

let count = 0
const getCount = () => {
    let c = count
    count += 1
    return c
}

const urlSchema = new mongoose.Schema({
    addr: {type: String, required: true, unique: true},
    url: {type: String, required: true},
    shorturl: {type: Number, default: getCount}
})

module.exports = mongoose.model('Url', urlSchema)

