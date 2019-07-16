import { ErrorHandler } from '../mysql/index';
import { EndpointModel } from './endpointModel';
import { sequelize } from './tests/setup';
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
  all(user: User): Promise<EndpointModel[]>;
  allWithoutUser(): Promise<Endpoint[]>;
  save(name: string, url: string, interval: number, user: User): Promise<Endpoint>;
  update(endpoint: Endpoint): Promise<{ endpointId: number; affectedRows: number }>;
  delete(id: number, user: User): Promise<{ message: string; endpointId: number; affectedRows: number }>;
    
}

// tslint:disable-next-line: max-func-body-length
export const endpoints = (errorHandler: ErrorHandler): EndpointsModule => {
  return {
    /**
     * Function for get all Endpoints by given user
     */
    all: (user: User): Promise<EndpointModel[]> => {
      return new Promise((resolve, reject) => {

        EndpointModel.findAll({
          where: {user_id: user.id},
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
    allWithoutUser: (): Promise<Endpoint[]> => {
      return new Promise((resolve, reject) => {
        EndpointModel.findAll()
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
    save: (name: string, url: string, interval: number, user: User): Promise<Endpoint> => {
      return new Promise((resolve, reject) => {
        const date = new Date();
        EndpointModel
          .create({ name, url, creation: date, lastCheck: date, interval, user_id: user.id })
          .then(endpointSaved => EndpointModel.findOrCreate({ where: { id: endpointSaved.id } }))
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
    update: (endpoint: Endpoint): Promise<{ endpointId: number; affectedRows: number }> => {
      return new Promise((resolve, reject) => {
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

        sequelize.query(`UPDATE endpoints SET ${keys.join(', ')} WHERE id = ?`, { replacements: [values.concat(id)] })
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
    delete: (id: number, user: User): Promise<{ message: string; endpointId: number; affectedRows: number }> => {
      return new Promise((resolve, reject) => {
        // const errorHandler = deps;
        EndpointModel.destroy({where: { id, user_id: user.id }})
        .then(deletedEndpoint => {
          console.log(deletedEndpoint);
          const affectedRows = EndpointModel.findAll();
          if (affectedRows === null) {
            errorHandler(undefined, `Nepodařilo se smazat uživatele s id ${deletedEndpoint}`);

            return reject();
          }
          else {
            return resolve({message: 'Endpoint úspěšně odstraněn.', endpointId: id, affectedRows: Object.keys(affectedRows).length});
          }
        });
      });
    },
  };
};
