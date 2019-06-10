const sha1 = require('sha1')

const users = deps => {
  return {
    all: () => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps
        connection.query('SELECT id, email FROM users', (error, results) => {
          if(error) {
            errorHandler(error, 'Nepodařilo se zobrazit seznam uživatelů', reject)
            return false
          }
          // resolve ({ pagination: { page: 2, results: results.length}, users: results })
          resolve ({ users: results })
        })
      })
    },
    save: (email, access_token) => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps
        connection.query('INSERT INTO users(email, access_token) VALUES(?,?)', [email, sha1(access_token)], (error, results) => {
          if(error) {
            errorHandler(error, `Nepodařilo se uložit uživatele ${email}`, reject)
            return false
          }
          resolve ({ user: { email, id: results.insertId } })
        })
      })
    },
    update: (id, email) => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps
        connection.query('UPDATE users SET access_token = ? WHERE id = ?', [sha1(access_token), id], (error, results) => {
          if(error || !results.affectedRows) {
            errorHandler(error, `Nepodařilo se změnit uživatele s id ${id}`, reject)
            return false
          }
          resolve ({ user: { id }, affectedRows: results.affectedRows })
        })
      })
    },
    delete: (id) => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps
        connection.query('DELETE FROM users WHERE id = ?', [id], (error, results) => {
          if(error || !results.affectedRows) {
            errorHandler(error, `Nepodařilo se smazat uživatele s id ${id}`, reject)
            return false
          }
          resolve ({ message: 'Uživatel úspěšně odstraněn.', affectedRows: results.affectedRows })
        })
      })
    },
  }
}

module.exports = users
