"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import * as mysqlServer from 'mysql';
const conf = require("../../config");
const auth_1 = require("./auth");
const endpoints_1 = require("./endpoints");
const results_1 = require("./results");
const users_1 = require("./users");
const sequelize_1 = require("sequelize");
const endpointModel_1 = require("./endpointModel");
const resultModel_1 = require("./resultModel");
const userModel_1 = require("./userModel");
exports.sequelize = new sequelize_1.Sequelize({
    database: conf.MYSQL_DATABASE || 'restify',
    username: conf.MYSQL_USER || undefined,
    password: conf.MYSQL_PASSWORD || undefined,
    host: conf.MYSQL_HOST,
    port: 3306,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 1,
    },
});
// export const sequelize = new Sequelize('mysql://' + conf.MYSQL_USER + ':' + conf.MYSQL_PASSWORD + '@' + conf.MYSQL_HOST + ':' + conf.PORT + '/' + conf.MYSQL_DATABASE);
resultModel_1.ResultModel.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    endpointId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
}, {
    sequelize: exports.sequelize,
    tableName: 'projects',
});
endpointModel_1.EndpointModel.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING(128),
        allowNull: false,
    },
    url: {
        type: sequelize_1.DataTypes.STRING(256),
        allowNull: false,
    },
    interval: {
        type: sequelize_1.DataTypes.INTEGER(),
        allowNull: false,
    },
    user_id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
}, {
    tableName: 'endpoints',
    sequelize: exports.sequelize,
});
userModel_1.UserModel.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    email: {
        type: sequelize_1.DataTypes.STRING(128),
        allowNull: false,
    },
    username: {
        type: sequelize_1.DataTypes.STRING(128),
        allowNull: false,
    },
    accessToken: {
        type: sequelize_1.DataTypes.STRING(128),
        allowNull: false,
    },
}, {
    tableName: 'users',
    sequelize: exports.sequelize,
});
resultModel_1.ResultModel.hasOne(endpointModel_1.EndpointModel, {
    sourceKey: 'id',
    onDelete: 'CASCADE',
});
userModel_1.UserModel.hasMany(endpointModel_1.EndpointModel, {
    sourceKey: 'id',
    foreignKey: 'user_id',
    as: 'endpoints',
});
endpointModel_1.EndpointModel.hasOne(userModel_1.UserModel, { sourceKey: 'id' });
endpointModel_1.EndpointModel.hasMany(resultModel_1.ResultModel, {
    sourceKey: 'id',
    foreignKey: 'endpointId',
    as: 'results',
    onDelete: 'CASCADE',
});
const errorHandler = (error, message) => {
    console.log(error, message);
};
exports.db = {
    resultModule: results_1.results(errorHandler),
    endpointModule: endpoints_1.endpoints(errorHandler),
    usersModule: users_1.users(errorHandler),
    authModule: auth_1.auth(errorHandler),
};
//# sourceMappingURL=index.js.map