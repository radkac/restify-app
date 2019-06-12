const mysqlServer = require('mysql')
require('dotenv').config()

const connection = mysqlServer.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_TEST_DATABASE
})

const errorHandler = (error, message, rejectFunction) => {
  console.error(error)
  rejectFunction({ error: message })
}

module.exports = { connection, errorHandler }
