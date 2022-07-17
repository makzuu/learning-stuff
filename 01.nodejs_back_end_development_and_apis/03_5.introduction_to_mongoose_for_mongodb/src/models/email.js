let mongoose = require('mongoose')
let validator = require('validator')

const timestampPlugin = require('./plugins/timestamp')

let emailSchema = new mongoose.Schema({
  email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: (value) => {
          return validator.isEmail(value)
      }
  }
})

emailSchema.plugin(timestampPlugin)

module.exports = mongoose.model('Email', emailSchema)
