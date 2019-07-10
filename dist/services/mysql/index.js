"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysqlServer = require("mysql");
const conf = require("../../config");
const auth_1 = require("./auth");
const endpoints_1 = require("./endpoints");
const results_1 = require("./results");
const users_1 = require("./users");
const connection = mysqlServer.createConnection({
    host: conf.MYSQL_HOST,
    user: conf.MYSQL_USER,
    password: conf.MYSQL_PASSWORD,
    database: conf.MYSQL_DATABASE,
});
const errorHandler = (error, message) => {
    console.log(error, message);
};
exports.db = {
    resultModule: results_1.results({ connection, errorHandler }),
    endpointModule: endpoints_1.endpoints({ connection, errorHandler }),
    usersModule: users_1.users({ connection, errorHandler }),
    authModule: auth_1.auth({ connection, errorHandler }),
};
//# sourceMappingURL=index.js.map