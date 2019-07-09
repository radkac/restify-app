"use strict";
;
exports.endpoints = function (deps) {
    return {
        /**
         * Function for get all Endpoints by given user
         */
        all: function (user) {
            return new Promise(function (resolve, reject) {
                var connection = deps.connection, errorHandler = deps.errorHandler;
                connection.query('SELECT * FROM endpoints WHERE user_id = ?', [user.id], function (error, endpoints) {
                    if (error) {
                        errorHandler(error, 'Nepodařilo se zobrazit list of endpoints');
                        reject();
                    }
                    // resolve promise
                    return resolve(endpoints);
                });
            });
        },
        /**
         * Function for get all Endpoints
         */
        allWithoutUser: function () {
            return new Promise(function (resolve, reject) {
                var connection = deps.connection, errorHandler = deps.errorHandler;
                connection.query('SELECT * FROM endpoints', function (error, endpoints) {
                    if (error) {
                        errorHandler(error, 'Nepodařilo se zobrazit list of endpoints');
                        reject();
                    }
                    // resolve promise
                    return resolve(endpoints);
                });
            });
        },
        /**
         * Function for save new row to db with params
         */
        save: function (name, url, interval, user) {
            return new Promise(function (resolve, reject) {
                var connection = deps.connection, errorHandler = deps.errorHandler;
                var date = new Date();
                connection.query('INSERT INTO endpoints(`name`, `url`, `creation`, `last_check`, `interval`, `user_id`) ' +
                    'VALUES(?,?,?,?,?,?)', [name, url, date, date, interval, user.id], function (error, endpoints) {
                    if (error) {
                        errorHandler(error, "Nepoda\u0159ilo se ulo\u017Eit endpoint " + name);
                        reject();
                    }
                    // resolve promise
                    return resolve({ id: endpoints.insertId, name: name, url: url });
                });
            });
        },
        /**
         * Function for update specific endpoint by given params
         */
        update: function (endpoint) {
            return new Promise(function (resolve, reject) {
                var connection = deps.connection, errorHandler = deps.errorHandler;
                var id = endpoint.id;
                var keys = [];
                var values = [];
                var array = ['name', 'url', 'last_check', 'changeInterval'];
                array.forEach(function (key) {
                    if (endpoint.hasOwnProperty(key) && endpoint[key] !== undefined) {
                        keys.push(key + " = ?");
                        values.push(endpoint[key]);
                    }
                });
                connection.query("UPDATE endpoints SET " + keys.join(', ') + " WHERE id = ?", values.concat(id), function (error, endpoint) {
                    if (error || !endpoint.affectedRows) {
                        errorHandler(error, "Nepoda\u0159ilo se zm\u011Bnit endpoint " + id);
                        reject();
                    }
                    // resolve promise
                    return resolve({ endpointId: endpoint.id, affectedRows: endpoint.affectedRows });
                });
            });
        },
        /**
         * Function for delete specific Endpoint by given id
         */
        delete: function (id) {
            return new Promise(function (resolve, reject) {
                var connection = deps.connection, errorHandler = deps.errorHandler;
                connection.query('DELETE FROM endpoints WHERE id = ?', [id], function (error, endpoints) {
                    if (error || !endpoints.affectedRows) {
                        errorHandler(error, "Nepoda\u0159ilo se smazat endpoint s id " + id);
                        reject();
                    }
                    // resolve promise
                    return resolve({ message: 'Endpoint i výsledky úspěšně odstraněny.', endpointId: id, affectedRows: endpoints.affectedRows });
                });
            });
        }
    };
};
