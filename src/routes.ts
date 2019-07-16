// import { results, endpoints, users, auth, mysqlServer } from "./services/mysql"; 
import { db } from './services/mysql';  

import * as Joi from '@hapi/joi';

import { endpointSchema } from './services/mysql/schemas/endpoint';
import { resultSchema } from './services/mysql/schemas/result';
import { authenticationSchema, createUserSchema, userSchema } from './services/mysql/schemas/user';

// tslint:disable-next-line: max-func-body-length
export const routes = (server: any) => {
  server.get('/', (res, next) => {
    res.send(200, 'Enjoy the silence!');
    next();
  });

  /**
   * @param email (String)
   * @param accessToken (String)
   * @return authenticationToken (x-access-token)
   */
  server.post('/authenticate', async (req, res) => {
    try {
      const { email, accessToken } = req.params;
      const { error } = Joi.validate({ email: email, access_token: accessToken }, authenticationSchema);
      
      if (error) {
        res.send(400, error);

        return;
      }

      res.send(200, await db.authModule.authenticate(email, accessToken));
    } catch (error) {
      if (error === 401) {
        res.send(401, 'Neautorizovaný požadavek.');
      }
      if (error === 500) {
        res.send(500, 'Nepodařilo se vygenerovat veřejný token.');
      }
    }
  });
  /**
   * @return all users
   */
  server.get('/user', async (_, res) => {
    try {
      const users = await db.usersModule.all();
      res.send(200, { results: users });
    } catch (error) {
      res.send(500, error);
    }
  });

  /**
   * @param email (String)
   * @param name (String)
   * @param password (String)
   *
   * @return new row in db.users
   */
  server.post('/user', async (req, res, next) => {
    try {
      const { email, name, password } = req.params;
      const { error } = Joi.validate({ email, username: name, access_token: password }, createUserSchema);
      if (error) {
        res.send(400, error);

        return;
      }
      res.send(201, await db.usersModule.save(email, name, password));
    } catch (error) {
      res.send(500, error);
    }
    next();
  });

  server.get('/currentUser', (req, res) => {
    const user = req.decoded;
    res.send(200, user);
  });

  /**
   * @param name (String - optional)
   * @param email (String - optional)
   *
   * @return update specific user in db.users
   */
  server.put('/user', async (req, res) => {
    const currentUser = req.decoded;
    const { name, email } = req.params;
    const userId = currentUser.id;
    try {
      const { error } = Joi.validate({ id: userId, username: name, email: email }, userSchema);
      if (error) {
        res.send(400, error);

        return;
      }
      res.send(200, await db.usersModule.update({ id: userId, username: name, email }));
    } catch (error) {
      res.send(500, error);
    }
  });

  /**
   * @return get all results for authorized user
   */
  server.get('/result', async (req, res) => {
    try {
      const user = req.decoded;
      const results = await db.resultModule.all(user);
      res.send(200, { results, user });
    } catch (error) {
      res.send(500, error);
    }
  });

  /**
   * @param id (Number - Endpoint id - required)
   *
   * @return new row in db.results
   */
  server.post('/result', async (req, res) => {
    const { id } = req.params;
    try {
      const { error } = Joi.validate({ id: id }, resultSchema);
      if (error) {
        res.send(400, error);

        return;
      }
      res.send(201, await db.resultModule.save(id, { statusCode: 200, request: req, body: '' }));
    } catch (error) {
      res.send(500, error);
    }
  });

  /**
   * @param id (Number - id of Result)
   *
   * @return delete row from db.results
   */
  server.del('/result', async (req, res) => {
    const { id } = req.params;
    try {
      const { error } = Joi.validate({ id: id }, resultSchema);
      if (error) {
        res.send(400, error);

        return;
      }
      res.send(200, await db.resultModule.delete(id));
    } catch (error) {
      res.send(500, error);
    }
  });

  /**
   * @return all endpoints for specific user
   */
  server.get('/endpoint', async (req, res) => {
    try {
      const user = req.decoded;
      const { error } = Joi.validate({ email: user.email, username: user.name }, userSchema);
      if (error) {
        res.send(400, error);

        return;
      }
      const endpoints = await db.endpointModule.all(user);
      res.send(200, { endpoints });
    } catch (error) {
      res.send(500, error);
    }
  });

  /**
   * @param id (Number)
   * @param name (String)
   * @param url (String)
   * @param interval (Number)
   *
   * @return updated row in db.endpoints
   */
  server.put('/endpoint', async (req, res) => {
    const { id, name, url, interval } = req.params;
    try {
      const { error } = Joi.validate({ id: id, name: name, url: url, interval: interval }, endpointSchema);
      if (error) {
        res.send(400, error);

        return;
      }
      res.send(200, await db.endpointModule.update({ id, name, url, interval }));
    } catch (error) {
      res.send(500, error);
    }
  });

  /**
   * @param name
   * @param url
   * @param interval
   *
   * @return new row in db.endpoints
   */
  server.post('/endpoint', async (req, res) => {
    const { name, url, interval } = req.params;
    const user = req.decoded;
    try {
      const { error } = Joi.validate({ name: name, url: url, interval: interval }, endpointSchema);
      if (error) {
        res.send(400, error);

        return;
      }
      res.send(201, await db.endpointModule.save(name, url, interval, user));
    } catch (error) {
      res.send(500, error);
    }
  });

  /**
   * @param id
   *
   * @return delete all results for specific endpoint and endpoint itself
   */
  server.del('/endpoint', async (req, res) => {
    const { id } = req.params;
    const user = req.decoded;
    try {
      const { error } = Joi.validate({ id: id }, endpointSchema);
      if (error) {
        res.send(400, error);

        return;
      }
      res.send(200, { results: await db.resultModule.deleteByEndpoint(id, user), endpoints: db.endpointModule.delete(id, user) });
    } catch (error) {
      res.send(500, error);
    }
  });
};
