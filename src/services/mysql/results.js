const results = deps => {
  return {
    all: () => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps
        connection.query('SELECT * FROM results', (error, results) => {
          if(error) {
            errorHandler(error, 'Nepodařilo se zobrazit seznam výsledků', reject)
            return false
          }
          // resolve ({ pagination: { page: 2, results: results.length}, results: results })
          resolve ({ results: results })
        })
      })
    },
    save: (name) => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps
        connection.query('INSERT INTO results(name) VALUES(?)', [name], (error, results) => {
          if(error) {
            errorHandler(error, `Nepodařilo se uložit výsledek ${name}`, reject)
            return false
          }
          resolve ({ result: { name, id: results.insertId } })
        })
      })
    },
    update: (id, name) => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps
        connection.query('UPDATE results SET name = ? WHERE id = ?', [name, id], (error, results) => {
          if(error || !results.affectedRows) {
            errorHandler(error, `Nepodařilo se změnit výsledek ${name}`, reject)
            return false
          }
          resolve ({ result: { name, id }, affectedRows: results.affectedRows })
        })
      })
    },
    delete: (id) => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps
        connection.query('DELETE FROM results WHERE id = ?', [id], (error, results) => {
          if(error || !results.affectedRows) {
            errorHandler(error, `Nepodařilo se smazat výsledek s id ${id}`, reject)
            return false
          }
          resolve ({ message: 'Výsledek úspěšně odstraněn.', affectedRows: results.affectedRows })
        })
      })
    },
  }
}

module.exports = results
