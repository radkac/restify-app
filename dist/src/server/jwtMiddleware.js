"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
var jwt = require("jsonwebtoken");
var conf = require('../config');
exports.jwtMiddleware = function (deps) {
    return function (req, res, next) __awaiter(this, void 0, void 0, function* () {
        if (!deps.exclusions.includes(req.href())) {
            var token = req.headers['x-access-token'];
            if (!token) {
                res.send(403, { error: 'Token is not valid' });
                return false;
            }
            try {
                req.decoded = jwt.verify(token, conf.JWT_SECRET);
            }
            catch (error) {
                res.send(403, { error: 'Token is not autenticated' });
                return false;
            }
        }
        next();
        return false;
    });
};
