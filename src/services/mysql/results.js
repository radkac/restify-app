const results = deps => {
  return {
    /**
     * Function for get all results
     */
    all: () => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps
        connection.query('SELECT * FROM results limit 11', (error, results) => {
          if (error) {
            errorHandler(error, 'Nepodařilo se zobrazit seznam výsledků', reject)
            return false
          }
          // resolve promise
          resolve({ results: results })
        })
      })
    },
    /**
     * Function for save new row to db with params
     */
    save: (endpoint, response) => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps
        const date = new Date()
        const endpointId = endpoint.id
        connection.query('INSERT INTO results(`last_check`, `http_status`, `payload`, `endpoint_id`) ' +
          'VALUES(?,?,?,?)', [date, response.statusCode, response.body, endpointId], (error, results) => {
          if (error) {
            errorHandler(error, `Nepodařilo se uložit výsledek ${endpointId}`, reject)
            return false
          }
          // resolve promise
          resolve({ result: { endpointId, id: results.insertId } })
        })
      })
    },
    /**
     * Function for delete specific Result
     */
    delete: (id) => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps
        connection.query('DELETE FROM results WHERE id = ?', [id], (error, results) => {
          if (error || !results.affectedRows) {
            errorHandler(error, `Nepodařilo se smazat výsledek s id ${id}`, reject)
            return false
          }
          // resolve promise
          resolve({ message: 'Výsledek úspěšně odstraněn.', affectedRows: results.affectedRows })
        })
      })
    },
    /**
     * Function for delete all Results by given Endpoint ID
     */
    deleteByEndpoint: (endpointId) => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps
        connection.query('DELETE FROM results WHERE endpoint_id = ?', endpointId, (error, results) => {
          if (error || !results.affectedRows) {
            errorHandler(error, `Nepodařilo se smazat endpoint s id ${endpointId}`, reject)
            return false
          }
          // resolve promise
          resolve({ endpointId: endpointId, message: 'Endpoint úspěšně odstraněn.', affectedRows: results.affectedRows })
        })
      })
    }
  }
}

// export results
module.exports = results
