"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const restify = require("restify");
const routes = require("./routes");
const cors_1 = require("./server/cors");
const jwtMiddleware_1 = require("./server/jwtMiddleware");
const validator = require("restify-joi-validator");
const exclusions = ['/authenticate'];
exports.server = restify.createServer();
exports.server.pre(cors_1.cors.preflight);
exports.server.use(cors_1.cors.actual);
exports.server.use(restify.plugins.bodyParser());
exports.server.use(jwtMiddleware_1.jwtMiddleware({ exclusions }));
exports.server.use(validator());
routes.routes(exports.server);
//# sourceMappingURL=app.js.map