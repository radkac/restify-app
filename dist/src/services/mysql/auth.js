"use strict";
var jwt = require("jsonwebtoken");
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
                connection.query(queryString, queryData, function (error, results) {
                    // handle error
                    if (error || !results.length) {
                        errorHandler(error, "Nepodařilo se zobrazit seznam uživatelů");
                        reject();
                        return false;
                    }
                    var _a = results[0], email = _a.email, id = _a.id;
                    // use JWT.SECRET for encode
                    var token = jwt.sign({ email: email, id: id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 });
                    return resolve({ token: token });
                });
            });
        }
    };
};
