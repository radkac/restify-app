import { Endpoint } from './endpoints';
import request = require('request');
import { Connection } from 'mysql';
import { ErrorHandler } from '.';

export type Result = {
  id: number,
  username: string,
  access_token: string,
  email: string
}

export interface ResultModule {
  all(): Promise<Result[]>;
  save(endpoint: Endpoint, response: object): Promise<number>;
  delete(id: number): Promise<{ message: string, affectedRows: number }>;
  deleteByEndpoint(endpointId: number): Promise<{ endpointId: number, message: string, affectedRows: number }>;
}

export const results = (deps: { connection: Connection, errorHandler: ErrorHandler}): ResultModule => {
  return {
    /**
     * Function for get all results
     */
    all: (): Promise<Result[]> => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps
        connection.query('SELECT * FROM results limit 11', (error, results) => {
          if (error) {
            errorHandler(error, 'Nepodařilo se zobrazit seznam výsledků');
            reject();
          }
          // resolve promise
          resolve(results)
        })
      })
    },
    /**
     * Function for save new row to db with params
     */
    save: (endpoint: Endpoint,  response: request.Response): Promise<number> => {
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
        })
      })
    },
    /**
     * Function for delete specific Result
     */
    delete: (id: number): Promise<{ message: string, affectedRows: number }> => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps;
        connection.query('DELETE FROM results WHERE id = ?', [id], (error, results) => {
          if (error || !results.affectedRows) {
            errorHandler(error, `Nepodařilo se smazat výsledek s id ${id}`);
            reject();
          }
          // resolve promise
          return resolve({ message: 'Výsledek úspěšně odstraněn.', affectedRows: results.affectedRows });
        })
      })
    },
    /**
     * Function for delete all Results by given Endpoint ID
     */
    deleteByEndpoint: (endpointId: number): Promise<{ endpointId: number, message: string, affectedRows: number }> => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps;
        connection.query('DELETE FROM results WHERE endpoint_id = ?', endpointId, (error, results) => {
          if (error || !results.affectedRows) {
            errorHandler(error, `Nepodařilo se smazat endpoint s id ${endpointId}`);
            reject();
          }
          // resolve promise
          return resolve({ endpointId: endpointId, message: 'Endpoint úspěšně odstraněn.', affectedRows: results.affectedRows })
        })
      })
    }
  }
}
