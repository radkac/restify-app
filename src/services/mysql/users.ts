const sha1 = require("sha1");
import { Connection } from 'mysql';
import { ErrorHandler } from '.';

export type User = {
  id: number,
  username?: string,
  access_token?: string,
  email?: string
}

export interface UsersModule {
  all(): Promise<User[]>;
  save(email: string, username: string, accessToken: string): Promise<User>;
  update(user: User): Promise<{ user: User, affectedRows: number }>;
  delete(id: number): Promise<{ message: string, affectedRows: number }>;
}

export const users = (deps: { connection: Connection, errorHandler: ErrorHandler }): UsersModule => {
  return {
    /**
    * Function for get all users
    */
    all: (): Promise<User[]> => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps
        connection.query('SELECT id, email FROM users', (error, users) => {
          if (error) {
            errorHandler(error, 'Nepodařilo se zobrazit seznam uživatelů');
            reject();
            // resolve([]);
          }
          // resolve promise
          return resolve(users);
        })
      })
    },
    /**
     * Function for save new row to db with params
     */
    save: (email: string, username: string, accessToken: string): Promise<User> => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps
        connection.query('INSERT INTO users(email, username, access_token) VALUES(?,?,?)', [email, username, sha1(accessToken)], (error, users) => {
          if (error) {
            errorHandler(error, `Nepodařilo se uložit uživatele ${email}`);
            reject();
          }
          // resolve promise
          return resolve({ id: users.insertId, email, username })
        })
      })
    },
    /**
     * Function for update specific user
     */
    update: (user: User): Promise<{ user: User, affectedRows: number }> => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps
        const { id } = user
        const keys = []
        const values = []
        const array = [ 'username', 'email' ]
        array.forEach((key) => { // filter only allowed values
          if (user.hasOwnProperty(key) && user[key] !== undefined) { // prepare only keys which are updating
            keys.push(`${key} = ?`)
            values.push(user[key])
          }
        })
        connection.query(`UPDATE users SET ${keys.join(', ')} WHERE id = ?`, values.concat(id), (error, user) => {
          if (error || !user.affectedRows) {
            errorHandler(error, `Nepodařilo se změnit uživatele ${id}`)
            reject();
          }
          // resolve promise
          return resolve({ user: user, affectedRows: user.affectedRows })
        })
      })
    },
    /**
     * Function for delete specific user
     */
    delete: (id: number): Promise<{ message: string, affectedRows: number}> => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps
        connection.query('DELETE FROM users WHERE id = ?', [id], (error, results) => {
          if (error || !results.affectedRows) {
            errorHandler(error, `Nepodařilo se smazat uživatele s id ${id}`)
            reject();
          }
          // resolve promise
          return resolve({ message: 'Uživatel úspěšně odstraněn.', affectedRows: results.affectedRows });
        })
      })
    }
  }
}

