require('dotenv').config()
const db = require('./services/mysql')
const check = require('./services/endpoints/check')

const server = require('./server')

async function checker () {
  try {
    const endpoints = await db.endpoints().allWithoutUser()
    const checkMonitors = endpoints.map((endpoint, index) => {
      return new check.EndpointChecker(db, endpoint)
    })
    checkMonitors.forEach((item) => {
      item.startMonitor()
    })
  } catch (error) {
    return false
  }
}

setTimeout(checker)

server.listen(process.env.PORT)
