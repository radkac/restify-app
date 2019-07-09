"use strict";
var corsMiddleware = require("restify-cors-middleware");
exports.cors = corsMiddleware({
    preflightMaxAge: 5,
    origins: ['*'],
    allowHeaders: ['*'],
    exposeHeaders: ['*']
});
