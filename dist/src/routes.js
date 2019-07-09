"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
// import { results, endpoints, users, auth, mysqlServer } from "./services/mysql"; 
var db = require("./services/mysql");
var Joi = require("@hapi/joi");
var user_1 = require("./services/mysql/schemas/user");
var result_1 = require("./services/mysql/schemas/result");
var endpoint_1 = require("./services/mysql/schemas/endpoint");
exports.routes = function (server) {
    server.get('/', function (res, next) {
        res.send('Enjoy the silence!');
        next();
    });
    /**
     * @param email (String)
     * @param accessToken (String)
     * @return authenticationToken (x-access-token)
     */
    server.post('/authenticate', function (req, res) __awaiter(this, void 0, void 0, function* () {
        try {
            var _a = req.params, email = _a.email, accessToken = _a.accessToken;
            var error = Joi.validate({ email: email, access_token: accessToken }, user_1["default"]).error;
            if (error) {
                res.send(400, error);
                return;
            }
            res.send(yield db.authModule.authenticate(email, accessToken));
        }
        catch (error) {
            res.send(400, error);
        }
    }));
    /**
     * @return all users
     */
    server.get('/user', function (res) __awaiter(this, void 0, void 0, function* () {
        try {
            var results = yield db.usersModule.all();
            res.send({ results: results });
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
    server.post('/user', function (req, res, next) __awaiter(this, void 0, void 0, function* () {
        try {
            var _a = req.params, email = _a.email, name_1 = _a.name, password = _a.password;
            var error = Joi.validate({ email: email, username: name_1, access_token: password }, user_1["default"]).error;
            if (error) {
                res.send(400, error);
                return;
            }
            res.send(yield db.usersModule.save(email, name_1, password));
        }
        catch (error) {
            res.send(400, error);
        }
        next();
    }));
    server.get('/currentUser', function (req, res) {
        var user = req.decoded;
        res.send(user);
    });
    /**
     * @param name (String - optional)
     * @param email (String - optional)
     *
     * @return update specific user in db.users
     */
    server.put('/user', function (req, res) __awaiter(this, void 0, void 0, function* () {
        var currentUser = req.decoded;
        var _a = req.params, name = _a.name, email = _a.email;
        var userId = currentUser.id;
        try {
            var error = Joi.validate({ id: userId, username: name, email: email }, user_1["default"]).error;
            if (error) {
                res.send(400, error);
                return;
            }
            res.send(yield db.usersModule.update({ id: userId, username: name, email: email }));
        }
        catch (error) {
            res.send(400, error);
        }
    }));
    /**
     * @return get all results for authorized user
     */
    server.get('/result', function (req, res) __awaiter(this, void 0, void 0, function* () {
        try {
            var results = yield db.resultModule.all();
            var user = req.decoded;
            res.send({ results: results, user: user });
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
    server.post('/result', function (req, res) __awaiter(this, void 0, void 0, function* () {
        var id = req.params.id;
        try {
            var error = Joi.validate({ id: id }, result_1["default"]).error;
            if (error) {
                res.send(400, error);
                return;
            }
            res.send(yield db.resultModule.save(id, { statusCode: 200, body: '' }));
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
    server.del('/result', function (req, res) __awaiter(this, void 0, void 0, function* () {
        var id = req.params.id;
        try {
            var error = Joi.validate({ id: id }, result_1["default"]).error;
            if (error) {
                res.send(400, error);
                return;
            }
            res.send(yield db.resultModule.delete(id));
        }
        catch (error) {
            res.send(400, error);
        }
    }));
    /**
     * @return all endpoints for specific user
     */
    server.get('/endpoint', function (req, res) __awaiter(this, void 0, void 0, function* () {
        try {
            var user = req.decoded;
            var error = Joi.validate({ email: user.email, username: user.name }, user_1["default"]).error;
            if (error) {
                res.send(400, error);
                return;
            }
            var endpoints = yield db.endpointModule.all(user);
            res.send({ endpoints: endpoints });
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
    server.put('/endpoint', function (req, res) __awaiter(this, void 0, void 0, function* () {
        var _a = req.params, id = _a.id, name = _a.name, url = _a.url, interval = _a.interval;
        try {
            var error = Joi.validate({ id: id, name: name, url: url, interval: interval }, endpoint_1["default"]).error;
            if (error) {
                res.send(400, error);
                return;
            }
            res.send(yield db.endpointModule.update({ id: id, name: name, url: url, interval: interval }));
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
    server.post('/endpoint', function (req, res) __awaiter(this, void 0, void 0, function* () {
        var _a = req.params, name = _a.name, url = _a.url, interval = _a.interval;
        var user = req.decoded;
        try {
            var error = Joi.validate({ name: name, url: url, interval: interval }, endpoint_1["default"]).error;
            if (error) {
                res.send(400, error);
                return;
            }
            res.send(yield db.endpointModule.save(name, url, interval, user));
        }
        catch (error) {
            res.send(400, error);
        }
    }));
    /**
     * @param id
     *
     * @return delete all results for specific endpoint and delete specific endpoint
     */
    server.del('/endpoint', function (req, res) __awaiter(this, void 0, void 0, function* () {
        var id = req.params.id;
        try {
            var error = Joi.validate({ id: id }, endpoint_1["default"]).error;
            if (error) {
                res.send(400, error);
                return;
            }
            res.send({ results: yield db.resultModule.deleteByEndpoint(id), endpoints: db.endpointModule.delete(id) });
        }
        catch (error) {
            res.send(400, error);
        }
    }));
};
exports.__esModule = true;
exports["default"] = exports.routes;
