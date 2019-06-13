const restify = require('restify')
const server = restify.createServer()
const routes = require('../http/routes')
const cors = require('./cors')
const jwtMiddleware = require('./jwtMiddleware')
const exclusions = ['/authenticate']
const validator = require('restify-joi-validator')

server.pre(cors.preflight)
server.use(cors.actual)
server.use(restify.plugins.bodyParser())
server.use(jwtMiddleware({ exclusions }))
server.use(validator())

routes(server)

module.exports = server
