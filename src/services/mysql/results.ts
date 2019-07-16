import * as request from 'request';
import { ErrorHandler } from '.';
import { EndpointModel } from './endpointModel';
import { Endpoint } from './endpoints';
import { ResultModel } from './resultModel';
import { User } from './users';

export type Result = {
  id: number;
  username: string;
  access_token: string;
  email: string;
};

export interface ResultModule {
  all(user: User): Promise<ResultModel[]>;
  save(endpoint: Endpoint, response: object): Promise<number>;
  delete(id: number): Promise<{ message: string; affectedRows: number }>;
  deleteByEndpoint(endpointId: number, user: User): Promise<{ endpointId: number; message: string; affectedRows: number }>;
}

// tslint:disable-next-line: max-func-body-length
export const results = (errorHandler: ErrorHandler): ResultModule => {
  return {
    /**
     * Function for get all results
     */
    all: (user: User): Promise<ResultModel[]> => {
      return new Promise((resolve, reject) => {
        ResultModel.findAll({ where: { user_id: user.id }, include: [EndpointModel] })
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
    save: (endpoint: Endpoint, response: request.Response): Promise<number> => {
      return new Promise((resolve, reject) => {
        const date = new Date();
        const endpointId = endpoint.id;
        ResultModel.create({ lastCheck: date, httpStatus: response.statusCode, payload: response.body, endpointId })
          .then(resultSaved => ResultModel.findOrCreate({ where: { id: resultSaved.id } }))
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
    delete: (resultId: number): Promise<{ message: string; affectedRows: number }> => {
      return new Promise((resolve, reject) => {
        ResultModel.destroy({ where: { id: resultId } })
          .then(deletedResult => {
            console.log(deletedResult);
            const affectedRows = ResultModel.findAll();
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
    deleteByEndpoint: (endpointId: number): Promise<{ endpointId: number; message: string; affectedRows: number }> => {
      return new Promise((resolve, reject) => {
        ResultModel.findAll({ attributes: ['endpointId'], where: { endpointId} })
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
