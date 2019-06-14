const sha1 = require('sha1')

const users = deps => {
  return {
    /**
    * Function for get all users
    */
    all: () => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps
        connection.query('SELECT id, email FROM users', (error, results) => {
          if (error) {
            errorHandler(error, 'Nepodařilo se zobrazit seznam uživatelů', reject)
            return false
          }
          // resolve promise
          resolve({ users: results })
        })
      })
    },
    /**
     * Function for save new row to db with params
     */
    save: (email, username, accessToken) => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps
        connection.query('INSERT INTO users(email, username, access_token) VALUES(?,?,?)', [email, username, sha1(accessToken)], (error, results) => {
          if (error) {
            errorHandler(error, `Nepodařilo se uložit uživatele ${email}`, reject)
            return false
          }
          // resolve promise
          resolve({ user: { email, username, id: results.insertId } })
        })
      })
    },
    /**
     * Function for update specific user
     */
    update: (user) => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps
        const { id } = user
        const keys = []
        const values = []
        const array = [ 'username', 'email' ]
        array.forEach((key) => { // filter only allowed values
          if (user.hasOwnProperty(key) && user[key] !== undefined) { // prepare only keys which are updating
            keys.push(`${key} = ?`)
            values.push(user[key])
          }
        })
        connection.query(`UPDATE users SET ${keys.join(', ')} WHERE id = ?`, values.concat(id), (error, users) => {
          if (error || !users.affectedRows) {
            errorHandler(error, `Nepodařilo se změnit uživatele ${id}`, reject)
            return false
          }
          // resolve promise
          resolve({ user: users, affectedRows: users.affectedRows })
        })
      })
    },
    /**
     * Function for delete specific user
     */
    delete: (id) => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps
        connection.query('DELETE FROM users WHERE id = ?', [id], (error, results) => {
          if (error || !results.affectedRows) {
            errorHandler(error, `Nepodařilo se smazat uživatele s id ${id}`, reject)
            return false
          }
          // resolve promise
          resolve({ message: 'Uživatel úspěšně odstraněn.', affectedRows: results.affectedRows })
        })
      })
    }
  }
}

// export users
module.exports = users
