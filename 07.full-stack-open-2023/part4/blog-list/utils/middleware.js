const logger = require('./logger')

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

module.exports = { logs, unknownEndpoint, errorHandler }
