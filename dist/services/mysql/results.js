"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.results = (deps) => {
    return {
        /**
         * Function for get all results
         */
        all: (user) => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps;
                connection.query('SELECT results.* FROM results JOIN endpoints ON results.endpoint_id = endpoints.id WHERE user_id = ? ORDER BY results.last_check DESC limit 10', [user.id], (error, results) => {
                    if (error) {
                        errorHandler(error, 'Nepodařilo se zobrazit seznam výsledků');
                        reject();
                    }
                    // resolve promise
                    return resolve(results);
                });
            });
        },
        /**
         * Function for save new row to db with params
         */
        save: (endpoint, response) => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps;
                const date = new Date();
                const endpointId = endpoint.id;
                connection.query('INSERT INTO results(`last_check`, `http_status`, `payload`, `endpoint_id`) ' +
                    'VALUES(?,?,?,?)', [date, response.statusCode, response.body, endpointId], (error, result) => {
                    if (error) {
                        errorHandler(error, `Nepodařilo se uložit výsledek ${endpointId}`);
                        reject();
                    }
                    // resolve promise
                    return resolve(result.insertId);
                });
            });
        },
        /**
         * Function for delete specific Result
         */
        delete: (id) => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps;
                connection.query('DELETE FROM results WHERE id = ?', [id], (error, results) => {
                    if (error || !results.affectedRows) {
                        errorHandler(error, `Nepodařilo se smazat výsledek s id ${id}`);
                        reject();
                    }
                    // resolve promise
                    return resolve({ message: 'Výsledek úspěšně odstraněn.', affectedRows: results.affectedRows });
                });
            });
        },
        /**
         * Function for delete all Results by given Endpoint ID
         */
        deleteByEndpoint: (endpointId, user) => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps;
                connection.query('DELETE r FROM results r JOIN endpoints e ON r.endpoint_id = e.id WHERE r.endpoint_id = ? AND e.user_id = ?', [endpointId, user.id], (error, results) => {
                    if (error || !results.affectedRows) {
                        errorHandler(error, `Nepodařilo se smazat endpoint s id ${endpointId}`);
                        reject();
                    }
                    // resolve promise
                    return resolve({ endpointId: endpointId, message: `Výsledky pro endpoint s id ${endpointId} úspěšně odstraněny.`, affectedRows: results.affectedRows });
                });
            });
        }
    };
};
//# sourceMappingURL=results.js.map