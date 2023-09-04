const logger = require('./logger')

const User = require('../models/user')

const jwt = require('jsonwebtoken')

const logs = (req, res, next) => {
    const { path, method, body, params } = req
    logger.info({ path, method, body })

    next()
}

const unknownEndpoint = (req, res) => res.status(400).json({ error: 'unknown endpoint' })

const errorHandler = (error, req, res, next) => {
    logger.error("error handle - error message: ", error.message)
    logger.error("error handle - error name: ", error.name)

    if (error.name === 'CastError')
        return res.status(400).json({ error: 'malformatted id' })

    if (error.name === 'ValidationError')
        return res.status(400).json({ error: error.message })

    if (error.name === 'JsonWebTokenError')
        return res.status(401).json({ error: error.message })

    next(error)
}

const tokenExtractor = (req, res, next) => {
    const auth = req.get('Authorization')
    if (auth && auth.startsWith('Bearer ')) {
        req.token = auth.replace('Bearer ', '');
        return next()
    }
    req.token = null
    next()
}

const userExtractor = async (req, res, next) => {
    if (req.token === null) {
        req.user = null
        return next()
    }

    const undecodedToken = jwt.verify(req.token, process.env.SECRET)
    if (!undecodedToken.id) {
        req.user = null
        return next()
    }

    req.user = await User.findById(undecodedToken.id)
    next()
}

module.exports = { logs, unknownEndpoint, errorHandler, tokenExtractor, userExtractor }
