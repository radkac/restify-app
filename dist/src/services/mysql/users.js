"use strict";
var sha1 = require("sha1");
exports.users = function (deps) {
    return {
        /**
        * Function for get all users
        */
        all: function () {
            return new Promise(function (resolve, reject) {
                var connection = deps.connection, errorHandler = deps.errorHandler;
                connection.query('SELECT id, email FROM users', function (error, users) {
                    if (error) {
                        errorHandler(error, 'Nepodařilo se zobrazit seznam uživatelů');
                        reject();
                    }
                    // resolve promise
                    return resolve(users);
                });
            });
        },
        /**
         * Function for save new row to db with params
         */
        save: function (email, username, accessToken) {
            return new Promise(function (resolve, reject) {
                var connection = deps.connection, errorHandler = deps.errorHandler;
                connection.query('INSERT INTO users(email, username, access_token) VALUES(?,?,?)', [email, username, sha1(accessToken)], function (error, users) {
                    if (error) {
                        errorHandler(error, "Nepoda\u0159ilo se ulo\u017Eit u\u017Eivatele " + email);
                        reject();
                    }
                    // resolve promise
                    return resolve({ id: users.insertId, email: email, username: username });
                });
            });
        },
        /**
         * Function for update specific user
         */
        update: function (user) {
            return new Promise(function (resolve, reject) {
                var connection = deps.connection, errorHandler = deps.errorHandler;
                var id = user.id;
                var keys = [];
                var values = [];
                var array = ['username', 'email'];
                array.forEach(function (key) {
                    if (user.hasOwnProperty(key) && user[key] !== undefined) {
                        keys.push(key + " = ?");
                        values.push(user[key]);
                    }
                });
                connection.query("UPDATE users SET " + keys.join(', ') + " WHERE id = ?", values.concat(id), function (error, user) {
                    if (error || !user.affectedRows) {
                        errorHandler(error, "Nepoda\u0159ilo se zm\u011Bnit u\u017Eivatele " + id);
                        reject();
                    }
                    // resolve promise
                    return resolve({ userId: id, affectedRows: user.affectedRows });
                });
            });
        },
        /**
         * Function for delete specific user
         */
        delete: function (id) {
            return new Promise(function (resolve, reject) {
                var connection = deps.connection, errorHandler = deps.errorHandler;
                connection.query('DELETE FROM users WHERE id = ?', [id], function (error, results) {
                    if (error || !results.affectedRows) {
                        errorHandler(error, "Nepoda\u0159ilo se smazat u\u017Eivatele s id " + id);
                        reject();
                    }
                    // resolve promise
                    return resolve({ message: 'Uživatel úspěšně odstraněn.', affectedRows: results.affectedRows });
                });
            });
        }
    };
};
