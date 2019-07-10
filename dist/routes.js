"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
// import { results, endpoints, users, auth, mysqlServer } from "./services/mysql"; 
const mysql_1 = require("./services/mysql");
const Joi = require("@hapi/joi");
const endpoint_1 = require("./services/mysql/schemas/endpoint");
const result_1 = require("./services/mysql/schemas/result");
const user_1 = require("./services/mysql/schemas/user");
// tslint:disable-next-line: max-func-body-length
exports.routes = (server) => {
    server.get('/', (res, next) => {
        res.send('Enjoy the silence!');
        next();
    });
    /**
     * @param email (String)
     * @param accessToken (String)
     * @return authenticationToken (x-access-token)
     */
    server.post('/authenticate', (req, res) => tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const { email, accessToken } = req.params;
            const { error } = Joi.validate({ email: email, access_token: accessToken }, user_1.userSchema);
            if (error) {
                res.send(400, error);
                return;
            }
            res.send(yield mysql_1.db.authModule.authenticate(email, accessToken));
        }
        catch (error) {
            res.send(400, error);
        }
    }));
    /**
     * @return all users
     */
    server.get('/user', (res) => tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const users = yield mysql_1.db.usersModule.all();
            res.send({ results: users });
        }
        catch (error) {
            res.send(400, error);
        }
    }));
    /**
     * @param email (String)
     * @param name (String)
     * @param password (String)
     *
     * @return new row in db.users
     */
    server.post('/user', (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const { email, name, password } = req.params;
            const { error } = Joi.validate({ email: email, username: name, access_token: password }, user_1.userSchema);
            if (error) {
                res.send(400, error);
                return;
            }
            res.send(yield mysql_1.db.usersModule.save(email, name, password));
        }
        catch (error) {
            res.send(400, error);
        }
        next();
    }));
    server.get('/currentUser', (req, res) => {
        const user = req.decoded;
        res.send(user);
    });
    /**
     * @param name (String - optional)
     * @param email (String - optional)
     *
     * @return update specific user in db.users
     */
    server.put('/user', (req, res) => tslib_1.__awaiter(this, void 0, void 0, function* () {
        const currentUser = req.decoded;
        const { name, email } = req.params;
        const userId = currentUser.id;
        try {
            const { error } = Joi.validate({ id: userId, username: name, email: email }, user_1.userSchema);
            if (error) {
                res.send(400, error);
                return;
            }
            res.send(yield mysql_1.db.usersModule.update({ id: userId, username: name, email: email }));
        }
        catch (error) {
            res.send(400, error);
        }
    }));
    /**
     * @return get all results for authorized user
     */
    server.get('/result', (req, res) => tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const user = req.decoded;
            const results = yield mysql_1.db.resultModule.all(user);
            res.send({ results, user });
        }
        catch (error) {
            res.send(400, error);
        }
    }));
    /**
     * @param id (Number - Endpoint id - required)
     *
     * @return new row in db.results
     */
    server.post('/result', (req, res) => tslib_1.__awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const { error } = Joi.validate({ id: id }, result_1.resultSchema);
            if (error) {
                res.send(400, error);
                return;
            }
            res.send(yield mysql_1.db.resultModule.save(id, { statusCode: 200, request: req, body: '' }));
        }
        catch (error) {
            res.send(400, error);
        }
    }));
    /**
     * @param id (Number - id of Result)
     *
     * @return delete row from db.results
     */
    server.del('/result', (req, res) => tslib_1.__awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const { error } = Joi.validate({ id: id }, result_1.resultSchema);
            if (error) {
                res.send(400, error);
                return;
            }
            res.send(yield mysql_1.db.resultModule.delete(id));
        }
        catch (error) {
            res.send(400, error);
        }
    }));
    /**
     * @return all endpoints for specific user
     */
    server.get('/endpoint', (req, res) => tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const user = req.decoded;
            const { error } = Joi.validate({ email: user.email, username: user.name }, user_1.userSchema);
            if (error) {
                res.send(400, error);
                return;
            }
            const endpoints = yield mysql_1.db.endpointModule.all(user);
            res.send({ endpoints });
        }
        catch (error) {
            res.send(400, error);
        }
    }));
    /**
     * @param id (Number)
     * @param name (String)
     * @param url (String)
     * @param interval (Number)
     *
     * @return updated row in db.endpoints
     */
    server.put('/endpoint', (req, res) => tslib_1.__awaiter(this, void 0, void 0, function* () {
        const { id, name, url, interval } = req.params;
        try {
            const { error } = Joi.validate({ id: id, name: name, url: url, interval: interval }, endpoint_1.endpointSchema);
            if (error) {
                res.send(400, error);
                return;
            }
            res.send(yield mysql_1.db.endpointModule.update({ id: id, name: name, url: url, interval: interval }));
        }
        catch (error) {
            res.send(400, error);
        }
    }));
    /**
     * @param name
     * @param url
     * @param interval
     *
     * @return new row in db.endpoints
     */
    server.post('/endpoint', (req, res) => tslib_1.__awaiter(this, void 0, void 0, function* () {
        const { name, url, interval } = req.params;
        const user = req.decoded;
        try {
            const { error } = Joi.validate({ name: name, url: url, interval: interval }, endpoint_1.endpointSchema);
            if (error) {
                res.send(400, error);
                return;
            }
            res.send(yield mysql_1.db.endpointModule.save(name, url, interval, user));
        }
        catch (error) {
            res.send(400, error);
        }
    }));
    /**
     * @param id
     *
     * @return delete all results for specific endpoint and endpoint itself
     */
    server.del('/endpoint', (req, res) => tslib_1.__awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        const user = req.decoded;
        try {
            const { error } = Joi.validate({ id: id }, endpoint_1.endpointSchema);
            if (error) {
                res.send(400, error);
                return;
            }
            res.send({ results: yield mysql_1.db.resultModule.deleteByEndpoint(id, user), endpoints: mysql_1.db.endpointModule.delete(id, user) });
        }
        catch (error) {
            res.send(400, error);
        }
    }));
};
//# sourceMappingURL=routes.js.map