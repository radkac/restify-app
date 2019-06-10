const sha1 = require('sha1')
const jwt = require('jsonwebtoken')

const auth = deps => {
  return {
    authenticate: (email, access_token) => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps
        const queryString = 'SELECT id, email FROM users WHERE email = ? AND access_token = ?'
        const queryData = [email, access_token]
        console.log(queryData);
        connection.query(queryString, queryData, (error, results) => {
          if(error || !results.length) {
            errorHandler(error, 'Nepodařilo se zobrazit seznam uživatelů', reject)
            return false
          }

          const { email, id } = results[0]
          const token = jwt.sign({email, id}, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24})
          console.log(token)

          resolve ({ token })
        })
      })
    }
  }
}

module.exports = auth
