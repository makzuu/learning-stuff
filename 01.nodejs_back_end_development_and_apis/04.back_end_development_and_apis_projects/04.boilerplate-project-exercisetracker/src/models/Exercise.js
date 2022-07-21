const { Schema, model, Types } = require('mongoose')

const exerciseSchema = Schema({
    user_id = Types.ObjectId(),
    date: {
        type: Date,
        default: new Date() 
    },
    duration: Number,
    description: String
})
