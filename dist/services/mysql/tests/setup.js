"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysqlServer = require("mysql");
const db = require("../../../config");
exports.connection = mysqlServer.createConnection({
    host: db.MYSQL_HOST,
    user: db.MYSQL_USER,
    password: db.MYSQL_PASSWORD,
    database: db.MYSQL_DATABASE
});
exports.errorHandler = (error, message) => {
    console.log(error, message);
};
//# sourceMappingURL=setup.js.map