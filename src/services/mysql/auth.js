const jwt = require('jsonwebtoken')

const auth = deps => {
  return {
    /**
     * Function for authentication user by given email and access_token
     */
    authenticate: (email, accessToken) => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps
        const queryString = 'SELECT id, email FROM users WHERE email = ? AND access_token = ?'
        const queryData = [email, accessToken]
        connection.query(queryString, queryData, (error, results) => {
          // handle error
          if (error || !results.length) {
            errorHandler(error, 'Nepodařilo se zobrazit seznam uživatelů', reject)
            return false
          }
          const { email, id } = results[0]
          // use JWT.SECRET for encode
          const token = jwt.sign({ email, id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 })
          resolve({ token })
        })
      })
    }
  }
}

// export auth
module.exports = auth
