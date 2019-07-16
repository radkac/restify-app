"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const endpointModel_1 = require("./endpointModel");
const setup_1 = require("./tests/setup");
// tslint:disable-next-line: max-func-body-length
exports.endpoints = (errorHandler) => {
    return {
        /**
         * Function for get all Endpoints by given user
         */
        all: (user) => {
            return new Promise((resolve, reject) => {
                endpointModel_1.EndpointModel.findAll({
                    where: { user_id: user.id },
                })
                    .then(endpointsList => {
                    if (endpointsList === null) {
                        errorHandler(undefined, 'Nepodařilo se zobrazit list of endpoints');
                        return reject();
                    }
                    else {
                        return resolve(endpointsList);
                    }
                });
            });
        },
        /**
         * Function for get all Endpoints
         */
        allWithoutUser: () => {
            return new Promise((resolve, reject) => {
                endpointModel_1.EndpointModel.findAll()
                    .then(endpointsList => {
                    if (endpointsList === null) {
                        errorHandler(undefined, 'Nepodařilo se zobrazit list of endpoints');
                        return reject();
                    }
                    else {
                        return resolve(endpointsList);
                    }
                });
            });
        },
        /**
         * Function for save new row to db with params
         */
        save: (name, url, interval, user) => {
            return new Promise((resolve, reject) => {
                const date = new Date();
                endpointModel_1.EndpointModel
                    .create({ name, url, creation: date, lastCheck: date, interval, user_id: user.id })
                    .then(endpointSaved => endpointModel_1.EndpointModel.findOrCreate({ where: { id: endpointSaved.id } }))
                    .then(([endpointSaved, created]) => {
                    console.log(endpointSaved.get({
                        plain: true,
                    }));
                    console.log(created);
                    return resolve({ id: endpointSaved.id, name, url });
                })
                    .catch(([error, endpoint]) => {
                    console.log(error);
                    errorHandler(undefined, `Nepodařilo se uložit endpoint ${endpoint.id}`);
                    reject(error);
                });
            });
        },
        /**
         * Function for update specific endpoint by given params
         */
        update: (endpoint) => {
            return new Promise((resolve, reject) => {
                const { id } = endpoint;
                const columns = [];
                const values = [];
                const keys = ['name', 'url', 'last_check', 'interval'];
                keys.forEach((key) => {
                    if (endpoint.hasOwnProperty(key) && endpoint[key] !== undefined) { // prepare only keys which are updating
                        columns.push(`endpoints.${key} = ?`);
                        values.push(endpoint[key]);
                    }
                });
                setup_1.sequelize.query(`UPDATE endpoints SET ${keys.join(', ')} WHERE id = ?`, { replacements: [values.concat(id)] })
                    .then(endpointUpdated => {
                    console.log(endpointUpdated);
                    return resolve({ endpointId: id, affectedRows: 1 }); // get affected Rows
                })
                    .catch(([error, endpointUpdated]) => {
                    console.log(error);
                    if (error || !endpointUpdated.affectedRows) {
                        errorHandler(undefined, `Nepodařilo se uložit změnit endpoint ${id}`);
                        reject(error);
                    }
                });
            });
        },
        /**
         * Function for deleting specific Endpoint by given id
         */
        delete: (id, user) => {
            return new Promise((resolve, reject) => {
                // const errorHandler = deps;
                endpointModel_1.EndpointModel.destroy({ where: { id, user_id: user.id } })
                    .then(deletedEndpoint => {
                    console.log(deletedEndpoint);
                    const affectedRows = endpointModel_1.EndpointModel.findAll();
                    if (affectedRows === null) {
                        errorHandler(undefined, `Nepodařilo se smazat uživatele s id ${deletedEndpoint}`);
                        return reject();
                    }
                    else {
                        return resolve({ message: 'Endpoint úspěšně odstraněn.', endpointId: id, affectedRows: Object.keys(affectedRows).length });
                    }
                });
            });
        },
    };
};
//# sourceMappingURL=endpoints.js.map