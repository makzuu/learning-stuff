const mongoose = require('mongoose')

const counterSchema = new mongoose.Schema({
    name: { type: String, default: 'UrlCounter', unique: true },
    count: { type: Number, default: 1 }
})

const urlSchema = new mongoose.Schema({
    addr: {type: String, required: true, unique: true},
    url: {type: String, required: true},
    shorturl: Number 
})

urlSchema.pre('save', function(next) {
    const Counter = mongoose.model('Counter', counterSchema)

    Counter.findOneAndUpdate({name: 'UrlCounter'}, {$inc: {count: 1}})
    .exec()
    .then(
        data => {
            if (!data) {
                const counter = new Counter()
                counter.save()
                    .then(
                        data => {
                            this.shorturl = data.count - 1
                            next()
                        })
            } else {
                this.shorturl = data.count
                next()
            } 
        }
    )
    .catch(err => next(err))
})

module.exports = mongoose.model('Url', urlSchema)

