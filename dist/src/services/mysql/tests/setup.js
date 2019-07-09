"use strict";
var mysqlServer = require("mysql");
var db = require('../../../config');
exports.connection = mysqlServer.createConnection({
    host: db.MYSQL_HOST,
    user: db.MYSQL_USER,
    password: db.MYSQL_PASSWORD,
    database: db.MYSQL_DATABASE
});
exports.errorHandler = function (error, message) {
    console.log(error, message);
};
