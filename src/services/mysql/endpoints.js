const request = require('request')

const endpoints = deps => {
  return {
    all: (user) => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps
        connection.query('SELECT * FROM endpoints WHERE user_id = ?', [user.id], (error, endpoints) => {
          if (error) {
            errorHandler(error, 'Nepodařilo se zobrazit list of endpoints', reject)
            return false
          }
          // resolve ({ pagination: { page: 2, endpoints: endpoints.length}, endpoints: endpoints })
          resolve(endpoints)
        })
      })
    },
    allWithoutUser: () => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps
        connection.query('SELECT * FROM endpoints', (error, endpoints) => {
          if (error) {
            errorHandler(error, 'Nepodařilo se zobrazit list of endpoints', reject)
            return false
          }
          // resolve ({ pagination: { page: 2, endpoints: endpoints.length}, endpoints: endpoints })
          resolve(endpoints)
        })
      })
    },
    save: (name, url, interval, user) => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps
        const date = new Date()
        connection.query('INSERT INTO endpoints(`name`, `url`, `creation`, `last_check`, `interval`, `user_id`) ' +
          'VALUES(?,?,?,?,?,?)', [name, url, date, date, interval, user.id], (error, endpoints) => {
          if (error) {
            errorHandler(error, `Nepodařilo se uložit endpoint ${name}`, reject)
            return false
          }
          resolve({ endpoint: { name, url, id: endpoints.insertId } })
        })
      })
    },

    update: (id, name, url, interval) => { // TODO: ako spravim niektore paramatre nepovinne?
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps
        connection.query('UPDATE endpoints SET name = ?, url = ?, interval = ? WHERE id = ?', [name, url, interval, id], (error, endpoints) => {
          if (error || !endpoints.affectedRows) {
            errorHandler(error, `Nepodařilo se změnit endpoint ${name}`, reject)
            return false
          }
          resolve({ result: { name, url, interval, id }, affectedRows: endpoints.affectedRows })
        })
      })
    },
    delete: (id) => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps
        connection.query('DELETE FROM endpoints WHERE id = ?', [id], (error, endpoints) => {
          if (error || !endpoints.affectedRows) {
            errorHandler(error, `Nepodařilo se smazat endpoint s id ${id}`, reject)
            return false
          }
          resolve({ message: 'Endpoint i výsledky úspěšně odstraněny.', endpointId: id, affectedRows: endpoints.affectedRows })
        })
      })
    },
    async checkEndpoints (db) {
      const endpoints = await this.allWithoutUser()
      const promises = endpoints.map((endpoint, index) => {
        return new Promise((resolve, reject) => {
          // ak nie je response tak lognut - prehodit do services
          request(endpoint.url, function (error, response, body) {
            if (error) {
              reject(error)
            }

            db.results().save(endpoint, response)

            resolve('ok')
          })
        })
      })
    }
  }
}

module.exports = endpoints
