"use strict";
var mysqlServer = require("mysql");
var results_1 = require('./results');
var endpoints_1 = require('./endpoints');
var users_1 = require('./users');
var auth_1 = require('./auth');
var db = require('../../config');
exports.connection = mysqlServer.createConnection({
    host: db.MYSQL_HOST,
    user: db.MYSQL_USER,
    password: db.MYSQL_PASSWORD,
    database: db.MYSQL_DATABASE
});
var errorHandler = function (error, message) {
    console.log(error, message);
};
exports.resultModule = results_1.results({ connection: exports.connection, errorHandler: errorHandler });
exports.endpointModule = endpoints_1.endpoints({ connection: exports.connection, errorHandler: errorHandler });
exports.usersModule = users_1.users({ connection: exports.connection, errorHandler: errorHandler });
exports.authModule = auth_1.auth({ connection: exports.connection, errorHandler: errorHandler });
