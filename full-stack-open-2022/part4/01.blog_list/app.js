const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

const blogsRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

const { MONGODB_URI } = require('./utils/config')
const { _info, _error } = require('./utils/logger')
const { unknownEndpoint, errorHandler, tokenExtractor, userExtractor } = require('./utils/middleware')

const mongoUrl = MONGODB_URI
mongoose.connect(mongoUrl)
  .then(() => _info('conestado'))
  .catch(error => _error(error.message))

app.use(cors())
app.use(express.json())

app.use('/api/blogs', tokenExtractor, userExtractor)
app.use('/api/blogs', blogsRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)

app.use(unknownEndpoint)
app.use(errorHandler)

module.exports = app
