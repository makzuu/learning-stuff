const userRouter = require('express').Router()
const User = require('../models/user')

const bcrypt = require('bcrypt')

userRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  if (!password) {
    return response.status(400).json({ error: 'password required' })
  } else if (password.length < 3) {
    return response.status(400).json({ error: 'password length must be at least 3 characters long' })
  }

  const passwordHash = await bcrypt.hash(password, 10)

  const user = new User({
    username, name, passwordHash
  })

  const newUser = await user.save()
  response.status(201).json(newUser)
})

userRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', { url: 1, title: 1, author: 1 })
  response.json(users)
})

module.exports = userRouter
