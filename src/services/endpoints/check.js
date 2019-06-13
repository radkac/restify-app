const request = require('request')

class EndpointChecker {
  constructor (db, endpoint) {
    this.db = db
    this.endpoint = endpoint
    this.startMonitor = this.startMonitor.bind(this)
  }

  check () {
    return new Promise((resolve, reject) => {
      request(this.endpoint.url, (error, response, body) => {
        if (error) {
          reject(error)
          return
        }
        this.db.results().save(this.endpoint, response)
        resolve('ok')
      })
    })
  }

  startMonitor () {
    this.check().then(() => {
      this.timeoutId = setTimeout(this.startMonitor, this.endpoint.interval)
    }).catch((error) => {
      console.error('Error:', error)
      this.timeoutId = setTimeout(this.startMonitor, this.endpoint.interval)
    })
  }

  stopMonitor () {
    clearTimeout(this.timeoutId)
  }
}

module.exports = { EndpointChecker }
