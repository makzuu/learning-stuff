const { _error } = require('./logger')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const unknownEndpoint = (request, response) => {
  response.status(404).json({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  _error(`$name: ${error.name} $message: ${error.message} $code: ${error.code}`)

  if (error.name === 'CastError') return response.status(400).json({ error: 'malformatted id' })
  if (error.name === 'ValidationError') return response.status(400).json({ error: error.message })
  if (error.name === 'MongoServerError') return response.status(400).json({ error: error.message })
  if (error.name === 'JsonWebTokenError') return response.status(401).json({ error: 'token missing or invalid' })

  next(error)
}

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    request.token = authorization.substring(7)
  }

  next()
}

const userExtractor = async (request, response, next) => {
  const token = request.token

  if (!token) return response.status(401).json({
    error: 'token missing or invalid'
  })

  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!decodedToken) {
    return response.status(401).json({
      error: 'token missing or invalid'
    })
  }

  const user = await User.findById(decodedToken.id)
  request.user = user

  next()
}

module.exports = {
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor
}
