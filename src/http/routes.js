const db = require('../services/mysql')
const Joi = require('@hapi/joi')
const { userSchema } = require('../services/mysql/schemas/user')
const { resultSchema } = require('../services/mysql/schemas/result')
const { endpointSchema } = require('../services/mysql/schemas/endpoint')

const routes = (server) => {
  server.get('/', (req, res, next) => {
    res.send('Enjoy the silence!')
    next()
  })

  /**
   * @param email (String)
   * @param accessToken (String)
   * @return authenticationToken (x-access-token)
   */
  server.post('/authenticate', async (req, res, next) => {
    try {
      const { email, accessToken } = req.params
      const { error, value } = Joi.validate({ email: email, access_token: accessToken }, userSchema)
      if (error) {
        res.send(400, error)
        return
      }
      res.send(await db.auth().authenticate(email, accessToken))
    } catch (error) {
      res.send(400, error)
    }
  })
  /**
   * @return all users
   */
  server.get('/user', async (req, res, next) => {
    try {
      const results = await db.users().all()
      res.send({ results })
    } catch (error) {
      res.send(400, error)
    }
  })

  /**
   * @param email (String)
   * @param name (String)
   * @param password (String)
   *
   * @return new row in db.users
   */
  server.post('/user', async (req, res, next) => {
    try {
      const { email, name, password } = req.params
      const { error, value } = Joi.validate({ email: email, username: name, access_token: password }, userSchema)
      if (error) {
        res.send(400, error)
        return
      }
      res.send(await db.users().save(email, name, password))
    } catch (error) {
      res.send(400, error)
    }
    next()
  })

  server.get('/currentUser', (req, res, next) => {
    const user = req.decoded
    res.send(user)
  })

  /**
   * @param name (String - optional)
   * @param email (String - optional)
   *
   * @return update specific user in db.users
   */
  server.put('/user', async (req, res, next) => {
    const currentUser = req.decoded
    const { name, email } = req.params
    const userId = currentUser.id
    try {
      const { error, value } = Joi.validate({ id: userId, username: name, email: email }, userSchema)
      if (error) {
        res.send(400, error)
        return
      }
      res.send(await db.users().update({ id: userId, username: name, email: email }))
    } catch (error) {
      res.send(400, error)
    }
  })

  /**
   * @return get all results for authorized user
   */
  server.get('/result', async (req, res, next) => {
    try {
      const results = await db.results().all()
      const user = req.decoded
      res.send({ results, user })
    } catch (error) {
      res.send(400, error)
    }
  })

  /**
   * @param id (Number - Endpoint id - required)
   *
   * @return new row in db.results
   */
  server.post('/result', async (req, res, next) => {
    const { id } = req.params
    try {
      const { error, value } = Joi.validate({ id: id }, resultSchema)
      if (error) {
        res.send(400, error)
        return
      }
      res.send(await db.results().save(id, { statusCode: 200, body: '' }))
    } catch (error) {
      res.send(400, error)
    }
  })

  /**
   * @param id (Number - id of Result)
   *
   * @return delete row from db.results
   */
  server.del('/result', async (req, res, next) => {
    const { id } = req.params
    try {
      const { error, value } = Joi.validate({ id: id }, resultSchema)
      if (error) {
        res.send(400, error)
        return
      }
      res.send(await db.results().delete(id))
    } catch (error) {
      res.send(400, error)
    }
  })

  /**
   * @return all endpoints for specific user
   */
  server.get('/endpoint', async (req, res, next) => {
    try {
      const user = req.decoded
      const { error, value } = Joi.validate({ email: user.email, username: user.name }, userSchema)
      if (error) {
        res.send(400, error)
        return
      }
      const endpoints = await db.endpoints().all(user)
      res.send({ endpoints })
    } catch (error) {
      res.send(400, error)
    }
  })

  /**
   * @param id (Number)
   * @param name (String)
   * @param url (String)
   * @param interval (Number)
   *
   * @return updated row in db.endpoints
   */
  server.put('/endpoint', async (req, res, next) => {
    const { id, name, url, interval } = req.params
    try {
      const { error, value } = Joi.validate({ id: id, name: name, url: url, interval: interval }, endpointSchema)
      if (error) {
        res.send(400, error)
        return
      }
      res.send(await db.endpoints().update({ id: id, name: name, url: url, interval: interval }))
    } catch (error) {
      res.send(400, error)
    }
  })

  /**
   * @param name
   * @param url
   * @param interval
   *
   * @return new row in db.endpoints
   */
  server.post('/endpoint', async (req, res, next) => {
    const { name, url, interval } = req.params
    const user = req.decoded
    try {
      const { error, value } = Joi.validate({ name: name, url: url, interval: interval }, endpointSchema)
      if (error) {
        res.send(400, error)
        return
      }
      res.send(await db.endpoints().save(name, url, interval, user))
    } catch (error) {
      res.send(400, error)
    }
  })

  /**
   * @param id
   *
   * @return delete all results for specific endpoint and delete specific endpoint
   */
  server.del('/endpoint', async (req, res, next) => {
    const { id } = req.params
    try {
      const { error, value } = Joi.validate({ id: id }, endpointSchema)
      if (error) {
        res.send(400, error)
        return
      }
      res.send({ results: await db.results().deleteByEndpoint(id), endpoints: db.endpoints().delete(id) })
    } catch (error) {
      res.send(400, error)
    }
  })
}

module.exports = routes
