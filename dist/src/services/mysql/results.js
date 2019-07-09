"use strict";
"id";
;
exports.results = deps;
{
    return {
        /**
         * Function for get all results
         */
        all: function () {
            return new Promise(function (resolve, reject) {
                var connection = deps.connection, errorHandler = deps.errorHandler;
                connection.query('SELECT * FROM results limit 11', function (error, results) {
                    if (error) {
                        errorHandler(error, 'Nepodařilo se zobrazit seznam výsledků', reject);
                        return false;
                    }
                    // resolve promise
                    resolve({ results: results });
                });
            });
        },
        /**
         * Function for save new row to db with params
         */
        save: function (endpoint, response) {
            return new Promise(function (resolve, reject) {
                var connection = deps.connection, errorHandler = deps.errorHandler;
                var date = new Date();
                var endpointId = endpoint.id;
                connection.query('INSERT INTO results(`last_check`, `http_status`, `payload`, `endpoint_id`) ' +
                    'VALUES(?,?,?,?)', [date, response.statusCode, response.body, endpointId], function (error, results) {
                    if (error) {
                        errorHandler(error, "Nepoda\u0159ilo se ulo\u017Eit v\u00FDsledek " + endpointId, reject);
                        return false;
                    }
                    // resolve promise
                    resolve({ result: { endpointId: endpointId, id: results.insertId } });
                });
            });
        },
        /**
         * Function for delete specific Result
         */
        delete: function (id) {
            return new Promise(function (resolve, reject) {
                var connection = deps.connection, errorHandler = deps.errorHandler;
                connection.query('DELETE FROM results WHERE id = ?', [id], function (error, results) {
                    if (error || !results.affectedRows) {
                        errorHandler(error, "Nepoda\u0159ilo se smazat v\u00FDsledek s id " + id, reject);
                        return false;
                    }
                    // resolve promise
                    resolve({ message: 'Výsledek úspěšně odstraněn.', affectedRows: results.affectedRows });
                });
            });
        },
        /**
         * Function for delete all Results by given Endpoint ID
         */
        deleteByEndpoint: function (endpointId) {
            return new Promise(function (resolve, reject) {
                var connection = deps.connection, errorHandler = deps.errorHandler;
                connection.query('DELETE FROM results WHERE endpoint_id = ?', endpointId, function (error, results) {
                    if (error || !results.affectedRows) {
                        errorHandler(error, "Nepoda\u0159ilo se smazat endpoint s id " + endpointId, reject);
                        return false;
                    }
                    // resolve promise
                    resolve({ endpointId: endpointId, message: 'Endpoint úspěšně odstraněn.', affectedRows: results.affectedRows });
                });
            });
        }
    };
}
