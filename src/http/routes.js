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
    } catch (error) {
      res.send(error)
    }
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

  server.post('/user', async (req, res, next) => {
    try {
      const { email, name, password } = req.params
      res.send(await db.users().save(email, name, password))
    } catch (error) {
      res.send(error)
    }
    next()
  })

  server.put('/user', async (req, res, next) => {
    const { id, name, email } = req.params
    try {
      res.send(await db.users().update(id, name, email))
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
    } catch (error) {
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
    } catch (error) {
      res.send(error)
    }
    next()
  })

  server.put('/result', async (req, res, next) => {
    const { id, name } = req.params
    try {
      res.send(await db.results().update(id, name))
    } catch (error) {
      res.send(error)
    }
    next()
  })

  server.del('/result', async (req, res, next) => {
    const { id } = req.params
    try {
      res.send(await db.results().delete(id))
    } catch (error) {
      res.send(error)
    }
    next()
  })

  server.get('/checkEndpoints', async (req, res, next) => {
    try {
      const user = req.decoded
      const endpoints = await db.endpoints().all(user)
      const promises = endpoints.map((endpoint, index) => {
        return new Promise((resolve, reject) => {
          request(endpoint.url, function (error, response, body) {
            if (error) {
              reject(error)
            }

            db.results().save(endpoint, response)

            resolve('ok')
            // }
          })
        })
      })
      await Promise.all(promises)
      res.send('ok')
    } catch (error) {
      res.send(error)
    }
    // next()
  })

  server.get('/endpoint', async (req, res, next) => {

    try {
      const user = req.decoded
      const endpoints = await db.endpoints().all(user)
      res.send({ endpoints })
    } catch (error) {
      res.send(error)
    }
    next()
  })

  server.put('/endpoint', async (req, res, next) => {
    const { id, name, url, interval } = req.params
    try {
      res.send(await db.endpoints().update(id, name, url, interval))
    }
    catch (error) {
      res.send(error)
    }
    next()
  })

  server.post('/endpoint', async (req, res, next) => {
    const { name, url, interval } = req.params
    const user = req.decoded

    try {
      res.send(await db.endpoints().save(name, url, interval, user))
    } catch (error) {
      res.send(error)
    }
    next()
  })

  server.del('/endpoint', async (req, res, next) => {
    const { id } = req.params
    try {
      res.send(await db.results().deleteByEndpoint(id)) // TODO: je to dobre?
      res.send(await db.endpoints().delete(id))
    } catch (error) {
      res.send(error)
    }
    next()
  })
}

module.exports = routes
