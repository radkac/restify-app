"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const endpointModel_1 = require("./endpointModel");
const resultModel_1 = require("./resultModel");
// tslint:disable-next-line: max-func-body-length
exports.results = (errorHandler) => {
    return {
        /**
         * Function for get all results
         */
        all: (user) => {
            return new Promise((resolve, reject) => {
                resultModel_1.ResultModel.findAll({ where: { user_id: user.id }, include: [endpointModel_1.EndpointModel] })
                    .then(resultsList => {
                    if (resultsList !== null) {
                        return resolve(resultsList);
                    }
                })
                    .catch(error => {
                    console.log(error);
                    errorHandler(undefined, 'Nepodařilo se zobrazit seznam výsledků');
                    reject(error);
                });
            });
        },
        /**
         * Function for save new row to db with params
         */
        save: (endpoint, response) => {
            return new Promise((resolve, reject) => {
                const date = new Date();
                const endpointId = endpoint.id;
                resultModel_1.ResultModel.create({ lastCheck: date, httpStatus: response.statusCode, payload: response.body, endpointId })
                    .then(resultSaved => resultModel_1.ResultModel.findOrCreate({ where: { id: resultSaved.id } }))
                    .then(([result, created]) => {
                    console.log(result.get({
                        plain: true,
                    }));
                    console.log(created);
                    resolve(result.id);
                })
                    .catch(error => {
                    console.log(error);
                    errorHandler(undefined, `Nepodařilo se uložit výsledek ${endpointId}`);
                    reject(error);
                });
            });
        },
        /**
         * Function for delete specific Result
         */
        delete: (resultId) => {
            return new Promise((resolve, reject) => {
                resultModel_1.ResultModel.destroy({ where: { id: resultId } })
                    .then(deletedResult => {
                    console.log(deletedResult);
                    const affectedRows = resultModel_1.ResultModel.findAll();
                    if (affectedRows !== null) {
                        return resolve({ message: 'Výsledek úspěšně odstraněn.', affectedRows: Object.keys(affectedRows).length });
                    }
                })
                    .catch(error => {
                    errorHandler(undefined, `Nepodařilo se smazat výsledek s id ${resultId}`);
                    reject(error);
                });
            });
        },
        /**
         * Function for delete all Results by given Endpoint ID
         */
        deleteByEndpoint: (endpointId) => {
            return new Promise((resolve, reject) => {
                resultModel_1.ResultModel.findAll({ attributes: ['endpointId'], where: { endpointId } })
                    .then(results => {
                    if (results.length === 0) {
                        return reject();
                    }
                    else {
                        results.forEach(result => {
                            result.destroy();
                        });
                        return resolve({
                            endpointId: endpointId,
                            message: `Výsledky pro endpoint s id ${endpointId} úspěšně odstraněny.`,
                            affectedRows: 1,
                        });
                    }
                })
                    .catch(error => {
                    console.log(error);
                    errorHandler(undefined, `Nepodařilo se smazat endpoint s id ${endpointId}`);
                    return reject(error);
                });
            });
        },
    };
};
//# sourceMappingURL=results.js.map