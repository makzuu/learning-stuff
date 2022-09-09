const app = require('./app')
const http = require('http')

const { PORT } = require('./utils/config')
const { _info } = require('./utils/logger')

const server = http.createServer(app)
server.listen(PORT, () => _info('server running on port', PORT))
