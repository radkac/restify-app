"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysqlServer = require("mysql");
const results_1 = require("./results");
const endpoints_1 = require("./endpoints");
const users_1 = require("./users");
const auth_1 = require("./auth");
const db = require("../../config");
exports.connection = mysqlServer.createConnection({
    host: db.MYSQL_HOST,
    user: db.MYSQL_USER,
    password: db.MYSQL_PASSWORD,
    database: db.MYSQL_DATABASE
});
const errorHandler = (error, message) => {
    console.log(error, message);
};
exports.resultModule = results_1.results({ connection: exports.connection, errorHandler });
exports.endpointModule = endpoints_1.endpoints({ connection: exports.connection, errorHandler });
exports.usersModule = users_1.users({ connection: exports.connection, errorHandler });
exports.authModule = auth_1.auth({ connection: exports.connection, errorHandler });
//# sourceMappingURL=index.js.map