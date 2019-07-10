import { Connection } from 'mysql';
import { ErrorHandler } from '../mysql/index';
import { User } from './users';

export type Endpoint = {
  id: number;
  name?: string;
  url?: string;
  creation?: Date;
  last_check?: Date;
  interval?: number;
  user_id?: number;
};
export interface EndpointsModule {
  all(user: User): Promise<Endpoint[]>;
  allWithoutUser(): Promise<Endpoint[]>;
  save(name: string, url: string, interval: number, user: User): Promise<Endpoint>;
  update(endpoint: Endpoint): Promise<{ endpointId: number; affectedRows: number }>;
  delete(id: number, user: User): Promise<{ message: string; endpointId: number; affectedRows: number }>;
    
}

export const endpoints = (deps: { connection: Connection; errorHandler: ErrorHandler}): EndpointsModule => {
  return {
    /**
     * Function for get all Endpoints by given user
     */
    all: (user: User): Promise<Endpoint[]> => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps;
        connection.query('SELECT * FROM endpoints WHERE user_id = ?', [user.id], (error, endpointsByUser) => {
          if (error) {
            errorHandler(error, 'Nepodařilo se zobrazit list of endpoints');
            reject();
          }

          return resolve(endpointsByUser);
        });
      });
    },
    /**
     * Function for get all Endpoints
     */
    allWithoutUser: (): Promise<Endpoint[]> => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps;
        connection.query('SELECT * FROM endpoints', (error, endpointsAll) => {
          if (error) {
            errorHandler(error, 'Nepodařilo se zobrazit list of endpoints');
            reject();
          }

          // resolve promise
          return resolve(endpointsAll);
        });
      });
    },
    /**
     * Function for save new row to db with params
     */
    save: (name: string, url: string, interval: number, user: User): Promise<Endpoint> => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps;
        const date = new Date();
        connection.query('INSERT INTO endpoints(`name`, `url`, `creation`, `last_check`, `interval`, `user_id`) VALUES(?,?,?,?,?,?)',
                         [name, url, date, date, interval, user.id], (error, endpointSaved) => {
            if (error) {
              errorHandler(error, `Nepodařilo se uložit endpoint ${name}`);
              reject();
            }
          
            return resolve({ id: endpointSaved.insertId, name, url });
          });
      });
    },
    /**
     * Function for update specific endpoint by given params
     */
    update: (endpoint: Endpoint): Promise<{ endpointId: number; affectedRows: number }> => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps;
        const { id } = endpoint;
        const columns = [];
        const values = [];
        const keys = ['name', 'url', 'last_check', 'interval'];
        
        keys.forEach((key) => { // filter only allowed values
          if (endpoint.hasOwnProperty(key) && endpoint[key] !== undefined) { // prepare only keys which are updating
            columns.push(`endpoints.${key} = ?`);
            values.push(endpoint[key]);
          }
        });

        connection.query(`UPDATE endpoints SET ${columns.join(', ')} WHERE id = ?`, values.concat(id), (error, endpointUpdated) => {
          if (error || !endpointUpdated.affectedRows) {
            errorHandler(error, `Nepodařilo se změnit endpoint ${id}`);
            reject();
          }

          return resolve({ endpointId: endpoint.id, affectedRows: endpointUpdated.affectedRows });
        });
      });
    },
    /**
     * Function for deleting specific Endpoint by given id
     */
    delete: (id: number, user: User): Promise<{ message: string; endpointId: number; affectedRows: number }> => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps;
        connection.query('DELETE FROM endpoints WHERE id = ? AND user_id = ?', [id, user.id], (error, endpointDeleted) => {
          if (error || !endpointDeleted.affectedRows) {
            errorHandler(error, `Nepodařilo se smazat endpoint s id ${id}`);
            reject();
          }

          return resolve({message: 'Endpoint i výsledky úspěšně odstraněny.', endpointId: id, affectedRows: endpointDeleted.affectedRows,
          });
        });
      });
    },
  };
};
