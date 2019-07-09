"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
;
exports.endpoints = (deps) => {
    return {
        /**
         * Function for get all Endpoints by given user
         */
        all: (user) => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps;
                connection.query('SELECT * FROM endpoints WHERE user_id = ?', [user.id], (error, endpoints) => {
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
        allWithoutUser: () => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps;
                connection.query('SELECT * FROM endpoints', (error, endpoints) => {
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
        save: (name, url, interval, user) => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps;
                const date = new Date();
                connection.query('INSERT INTO endpoints(`name`, `url`, `creation`, `last_check`, `interval`, `user_id`) ' +
                    'VALUES(?,?,?,?,?,?)', [name, url, date, date, interval, user.id], (error, endpoints) => {
                    if (error) {
                        errorHandler(error, `Nepodařilo se uložit endpoint ${name}`);
                        reject();
                    }
                    // resolve promise
                    return resolve({ id: endpoints.insertId, name, url });
                });
            });
        },
        /**
         * Function for update specific endpoint by given params
         */
        update: (endpoint) => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps;
                const { id } = endpoint;
                const keys = [];
                const values = [];
                const array = ['name', 'url', 'last_check', 'changeInterval'];
                array.forEach((key) => {
                    if (endpoint.hasOwnProperty(key) && endpoint[key] !== undefined) { // prepare only keys which are updating
                        keys.push(`${key} = ?`);
                        values.push(endpoint[key]);
                    }
                });
                connection.query(`UPDATE endpoints SET ${keys.join(', ')} WHERE id = ?`, values.concat(id), (error, endpoint) => {
                    if (error || !endpoint.affectedRows) {
                        errorHandler(error, `Nepodařilo se změnit endpoint ${id}`);
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
        delete: (id) => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps;
                connection.query('DELETE FROM endpoints WHERE id = ?', [id], (error, endpoints) => {
                    if (error || !endpoints.affectedRows) {
                        errorHandler(error, `Nepodařilo se smazat endpoint s id ${id}`);
                        reject();
                    }
                    // resolve promise
                    return resolve({ message: 'Endpoint i výsledky úspěšně odstraněny.', endpointId: id, affectedRows: endpoints.affectedRows });
                });
            });
        }
    };
};
//# sourceMappingURL=endpoints.js.map