const { Schema, model} = require('mongoose')

const exerciseSchema = Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        unique: true
    },
    date: {
        type: Date,
        default: new Date() 
    },
    duration: Number,
    description: String
})

module.exports = model('Exercise', exerciseSchema)
