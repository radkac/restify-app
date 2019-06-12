require('dotenv').config()
const db = require('./services/mysql')

const server = require('./server')

// function endpoints () {
//   db.endpoints().checkEndpoints(db)
//   setTimeout(endpoints, 3000)
// }
// setTimeout(endpoints, 3000) //setInterval

server.listen(process.env.PORT)
