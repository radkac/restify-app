"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sha1 = require("sha1");
exports.users = (deps) => {
    return {
        /**
        * Function for get all users
        */
        all: () => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps;
                connection.query('SELECT id, email FROM users', (error, users) => {
                    if (error) {
                        errorHandler(error, 'Nepodařilo se zobrazit seznam uživatelů');
                        reject();
                        // resolve([]);
                    }
                    // resolve promise
                    return resolve(users);
                });
            });
        },
        /**
         * Function for save new row to db with params
         */
        save: (email, username, accessToken) => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps;
                connection.query('INSERT INTO users(email, username, access_token) VALUES(?,?,?)', [email, username, sha1(accessToken)], (error, users) => {
                    if (error) {
                        errorHandler(error, `Nepodařilo se uložit uživatele ${email}`);
                        reject();
                    }
                    // resolve promise
                    return resolve({ id: users.insertId, email, username });
                });
            });
        },
        /**
         * Function for update specific user
         */
        update: (user) => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps;
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
                connection.query(`UPDATE users SET ${keys.join(', ')} WHERE id = ?`, values.concat(id), (error, userUpdate) => {
                    if (error || !userUpdate.affectedRows) {
                        errorHandler(error, `Nepodařilo se změnit uživatele ${id}`);
                        reject();
                    }
                    // resolve promise
                    return resolve({ user: user, affectedRows: userUpdate.affectedRows });
                });
            });
        },
        /**
         * Function for delete specific user
         */
        delete: (id) => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps;
                connection.query('DELETE FROM users WHERE id = ?', [id], (error, results) => {
                    if (error || !results.affectedRows) {
                        errorHandler(error, `Nepodařilo se smazat uživatele s id ${id}`);
                        reject();
                    }
                    // resolve promise
                    return resolve({ message: 'Uživatel úspěšně odstraněn.', affectedRows: results.affectedRows });
                });
            });
        }
    };
};
//# sourceMappingURL=users.js.map