"use strict";
var jwt = require("jsonwebtoken");
var conf = require('../../config');
;
exports.auth = function (deps) {
    return {
        /**
         * Function for authentication user by given email and access_token
         */
        authenticate: function (email, accessToken) {
            return new Promise(function (resolve, reject) {
                var connection = deps.connection, errorHandler = deps.errorHandler;
                var queryString = 'SELECT id, email FROM users WHERE email = ? AND access_token = ?';
                var queryData = [email, accessToken];
                connection.query(queryString, queryData, function (error, users) {
                    // handle error
                    if (error || !users.length) {
                        errorHandler(error, "Nepodařilo se vygenerovat autorizační token.");
                        reject();
                        return false;
                    }
                    var _a = users[0], email = _a.email, id = _a.id;
                    console.log(users[0]);
                    // use JWT.SECRET for encode
                    var token = jwt.sign({ email: email, id: id }, conf.JWT_SECRET, { expiresIn: 60 * 60 * 24 });
                    return resolve(token);
                });
            });
        }
    };
};
