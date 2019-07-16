import { reject } from 'bluebird';
import sha1 = require('sha1');
import { ErrorHandler, sequelize } from '.';
import { UserModel } from './userModel';

export type User = {
  id: number;
  username?: string;
  access_token?: string;
  email?: string;
};

export interface UsersModule {
  all(): Promise<User[]>;
  save(email: string, username: string, accessToken: string): Promise<User>;
  update(user: User): Promise<{ user: any; affectedRows: number }>;
  delete(userId: number): Promise<{ message: string; affectedRows: number }>;
}

// tslint:disable-next-line: max-func-body-length
export const users = (errorHandler: ErrorHandler): UsersModule => {
  return {
    /**
     * Function for get all users
     */
    all: (): Promise<User[]> => {
      return new Promise((resolve, reject) => {
        UserModel.findAll()
          .then(usersList => {
            if (usersList === null) {
              errorHandler(undefined, 'Nepodařilo se zobrazit list of users');

              return reject();
            }
            else {
              return resolve(usersList);
            }
          }); 
      }); 
    },

    /**
     * Function for save new row to db with params
     */
    save: (email: string, username: string, accessToken: string): Promise<User> => {
      return new Promise((resolve) => {
        UserModel
        .create({ email, username, accessToken: sha1(accessToken) })
        .then(userSaved => UserModel.findOrCreate({ where: { id: userSaved.id }}))
        .then(([user, created]) => {
          console.log(user.get({
            plain: true,
          }));
          console.log(created);
          resolve({ id: user.id, email, username });
        })
        .catch(([error, user]) => {
          console.log(error);
          errorHandler(undefined, `Nepodařilo se uložit uživatele ${user.id}`);
          reject(error);
        });
      });
    },
    /**
     * Function for update specific user
     */
    update: (user: User): Promise<{ user: any; affectedRows: number }> => {
      return new Promise((resolve, reject) => {
        const { id } = user;
        const keys = [];
        const values = [];
        const array = ['username', 'email'];
        array.forEach((key) => { // filter only allowed values
          if (user.hasOwnProperty(key) && user[key] !== undefined) { // prepare only keys which are updating
            keys.push(`${key} = ?`);
            values.push(user[key]);
          }
        });

        // `UPDATE users SET ${keys.join(', ')} WHERE id = ?`, values.concat(id),

        sequelize.query(`UPDATE users SET ${keys.join(', ')} WHERE id = ?`, { replacements: [values.concat(id)] })
          .then(updatedUser => {
            // console.log(results.get({
            //   plain: true,
            // }));
            console.log(updatedUser);

            return resolve({ user: updatedUser, affectedRows: 1 }); // get affected Rows
          })
          .catch(([error, updatedUser]) => {
            console.log(error);
            if (error || !updatedUser.affectedRows) {
              errorHandler(undefined, `Nepodařilo se uložit uživatele ${updatedUser.id}`);
              reject(error);
            }
          });
      });
    },
    /**
     * Function for delete specific user
     */
    delete: (userId: number): Promise<{ message: string; affectedRows: number}> => {
      return new Promise((resolve, reject) => {
        UserModel.destroy({where: { id: userId }})
          .then(deletedUser => {
            console.log(deletedUser);
            const affectedRows = UserModel.findAll();
            if (affectedRows === null) {
            errorHandler(undefined, `Nepodařilo se smazat uživatele s id ${deletedUser}`);

            return reject();
            }
            else {
              return resolve({message: 'Uživatel úspěšně odstraněn.', affectedRows: Object.keys(affectedRows).length});
            }
          });
      });
    },
  };
};
