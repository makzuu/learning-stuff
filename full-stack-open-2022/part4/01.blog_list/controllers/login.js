const loginRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const { SECRET } = require('../utils/config')

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body
  const user = await User.findOne({ username })

  let isPasswordCorrect

  if (user) {
    isPasswordCorrect = await bcrypt.compare(password, user.passwordHash)
  } else {
    isPasswordCorrect = false
  }

  if (!(user && isPasswordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  const token = jwt.sign({
    username: user.username,
    id: user._id
  }, SECRET)

  response
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter
