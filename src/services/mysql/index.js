
const mysqlServer = require('mysql')

const connection = mysqlServer.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
})

const errorHandler = (error, message, rejectFunction) => {
  console.error(error)
  rejectFunction({error: message})
}

const resultModule = require('./results')({ connection, errorHandler });
const endpointModule = require('./endpoints')({ connection, errorHandler });

const usersModule = require('./users')({ connection, errorHandler });
const authModule = require('./auth')({ connection, errorHandler });


module.exports = {
  results: () => resultModule,
  endpoints: () => endpointModule,
  users: () => usersModule,
  auth: () => authModule,
}
