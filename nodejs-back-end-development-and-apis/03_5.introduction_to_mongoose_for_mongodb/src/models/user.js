const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    createdAt: Date,
    updatedAt: Date
})

userSchema.virtual('fullName').get(function() {
    return `${this.firstName} ${this.lastName}`
})

userSchema.virtual('fullName').set(function(name) {
    let str = name.split(' ')

    this.firstName = str[0]
    this.lastName = str[1]
})

userSchema.methods.getInitials = function() {
    return this.firstName[0] + this.lastName[0]
}

userSchema.statics.getUsers = function() {
    return new Promise((resolve, reject) => {
        this.find()
        .then(users => {
            resolve(users)
        })
        .catch(err => {
            reject(err)
        })
    })
}

userSchema.pre('save', function(next) {
    const now = Date.now()
    this.updatedAt = now

    if (!this.createdAt) this.createdAt = now

    next()
})

module.exports = mongoose.model('User', userSchema)
