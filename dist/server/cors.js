"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const corsMiddleware = require("restify-cors-middleware");
exports.cors = corsMiddleware({
    preflightMaxAge: 5,
    origins: ['*'],
    allowHeaders: ['*'],
    exposeHeaders: ['*']
});
//# sourceMappingURL=cors.js.map