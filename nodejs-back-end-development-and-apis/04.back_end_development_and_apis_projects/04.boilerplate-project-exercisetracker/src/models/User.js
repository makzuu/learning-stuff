const { Schema, model } = require('mongoose')

const userSchema = new Schema({
    username: {
        type: String,
        lowercase: true,
        unique: true,
        required: true
    },
})

module.exports = model('User', userSchema)
