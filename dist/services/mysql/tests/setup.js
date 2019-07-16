"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const conf = require("../../../config");
exports.sequelize = new sequelize_1.Sequelize('database', 'username', 'password', {
    database: conf.MYSQL_DATABASE || 'restify',
    username: conf.MYSQL_USER || undefined,
    password: conf.MYSQL_PASSWORD || undefined,
    host: conf.MYSQL_HOST,
    port: conf.PORT,
    dialect: 'mysql',
});
exports.errorHandler = (error, message) => {
    console.log(error, message);
};
//# sourceMappingURL=setup.js.map