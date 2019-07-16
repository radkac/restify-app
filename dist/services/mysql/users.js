"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bluebird_1 = require("bluebird");
const sha1 = require("sha1");
const _1 = require(".");
const userModel_1 = require("./userModel");
// tslint:disable-next-line: max-func-body-length
exports.users = (errorHandler) => {
    return {
        /**
         * Function for get all users
         */
        all: () => {
            return new Promise((resolve, reject) => {
                userModel_1.UserModel.findAll()
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
        save: (email, username, accessToken) => {
            return new Promise((resolve) => {
                userModel_1.UserModel
                    .create({ email, username, accessToken: sha1(accessToken) })
                    .then(userSaved => userModel_1.UserModel.findOrCreate({ where: { id: userSaved.id } }))
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
                    bluebird_1.reject(error);
                });
            });
        },
        /**
         * Function for update specific user
         */
        update: (user) => {
            return new Promise((resolve, reject) => {
                const { id } = user;
                const keys = [];
                const values = [];
                const array = ['username', 'email'];
                array.forEach((key) => {
                    if (user.hasOwnProperty(key) && user[key] !== undefined) { // prepare only keys which are updating
                        keys.push(`${key} = ?`);
                        values.push(user[key]);
                    }
                });
                // `UPDATE users SET ${keys.join(', ')} WHERE id = ?`, values.concat(id),
                _1.sequelize.query(`UPDATE users SET ${keys.join(', ')} WHERE id = ?`, { replacements: [values.concat(id)] })
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
        delete: (userId) => {
            return new Promise((resolve, reject) => {
                userModel_1.UserModel.destroy({ where: { id: userId } })
                    .then(deletedUser => {
                    console.log(deletedUser);
                    const affectedRows = userModel_1.UserModel.findAll();
                    if (affectedRows === null) {
                        errorHandler(undefined, `Nepodařilo se smazat uživatele s id ${deletedUser}`);
                        return reject();
                    }
                    else {
                        return resolve({ message: 'Uživatel úspěšně odstraněn.', affectedRows: Object.keys(affectedRows).length });
                    }
                });
            });
        },
    };
};
//# sourceMappingURL=users.js.map