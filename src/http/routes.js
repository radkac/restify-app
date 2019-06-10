const db = require('../services/mysql')
const request = require('request');


// db.results().all()
// db.results.save(name)
// db.results.update(id, name)
// db.results.delete(id)

const routes = (server) => {
  server.get('/', (req, res, next) => {
    res.send('Enjoy the silence!')
    next()
  })

  server.post('/authenticate', async (req, res, next) => {
    try {
      const { email, access_token } = req.params
      res.send(await db.auth().authenticate(email, access_token))
    }
    catch (error) {
      res.send(error)
    }
    next()
  })

  server.get('/checkEndpoints', (req, res, next) => {
    request('http://www.google.com', function (error, response, body) {
      if (!error && response.statusCode == 200) {
        res.send(body)
      }
    })
    next()
  })

  server.get('/user', async (req, res, next) => {

    try {
      const results = await db.users().all()
      // const user = req.decoded
      res.send({ results })
    } catch (error) {
      res.send(error)
    }
    next()
  })

  server.get('/result', async (req, res, next) => {

    try {
      const results = await db.results().all()
      const user = req.decoded
      res.send({ results, user })
    }

    catch (error) {
      res.send(error)
    }
    next()

    // results.then(results => console.log(results)).catch(error(error))
    // db.results().all().then(results => {
    //   res.send(results)
    //
    // }).catch(error => {
    //   res.send(error)
    //
    // })
  })

  server.post('/result', async (req, res, next) => {
    const { name } = req.params
    try {
      res.send(await db.results().save(name))
    }
    catch (error) {
      res.send(error)
    }
    next()

  })

  server.put('/result', async (req, res, next) => {
    const { id, name } = req.params
    try {
      res.send(await db.results().update(id, name))
    }
    catch (error) {
      res.send(error)
    }
    next()

  })

  server.del('/result', async (req, res, next) => {
    const { id } = req.params
    try {
      res.send(await db.results().delete(id))
    }
    catch (error) {
      res.send(error)
    }
    next()

  })
}

module.exports = routes
