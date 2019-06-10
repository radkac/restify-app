const endpoints = deps => {
  return {
    all: (user) => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps
        connection.query('SELECT * FROM endpoints WHERE user_id = ?', [user.id], (error, endpoints) => {
          if(error) {
            errorHandler(error, 'Nepodařilo se zobrazit list of endpoints', reject)
            return false
          }
          // resolve ({ pagination: { page: 2, endpoints: endpoints.length}, endpoints: endpoints })
          resolve ({ endpoints: endpoints })
        })
      })
    },
    save: (name, url, interval, user) => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps
        const date = new Date()
        connection.query('INSERT INTO endpoints(`name`, `url`, `creation`, `last_check`, `interval`, `user_id`) ' +
          'VALUES(?,?,?,?,?,?)', [name, url, date, date, interval, user.id], (error, endpoints) => {
          if(error) {
            errorHandler(error, `Nepodařilo se uložit endpoint ${name}`, reject)
            return false
          }
          resolve ({ endpoint: { name, url, id: endpoints.insertId } })
        })
      })
    },

    update: (id, name, url, interval) => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps
        connection.query('UPDATE endpoints SET name = ?, url = ?, interval = ? WHERE id = ?', [name, url, interval, id], (error, endpoints) => {
          if(error || !endpoints.affectedRows) {
            errorHandler(error, `Nepodařilo se změnit endpoint ${name}`, reject)
            return false
          }
          resolve ({ result: { name, url, interval, id }, affectedRows: endpoints.affectedRows })
        })
      })
    },
    delete: (id) => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps
        connection.query('DELETE FROM endpoints WHERE id = ?', [id], (error, endpoints) => {
          if(error || !endpoints.affectedRows) {
            errorHandler(error, `Nepodařilo se smazat endpoint s id ${id}`, reject)
            return false
          }
          resolve ({ message: 'Endpoint úspěšně odstraněn.', affectedRows: endpoints.affectedRows })
        })
      })
    },
  }
}

module.exports = endpoints
