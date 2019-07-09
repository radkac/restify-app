"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
;
exports.auth = (deps) => {
    return {
        /**
         * Function for authentication user by given email and access_token
         */
        authenticate: (email, accessToken) => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps;
                const queryString = 'SELECT id, email FROM users WHERE email = ? AND access_token = ?';
                const queryData = [email, accessToken];
                connection.query(queryString, queryData, (error, users) => {
                    // handle error
                    if (error || !users.length) {
                        errorHandler(error, "Nepodařilo se zobrazit seznam uživatelů");
                        reject();
                        return false;
                    }
                    const { email, id } = users[0];
                    // use JWT.SECRET for encode
                    const token = jwt.sign({ email, id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 });
                    return resolve(token);
                });
            });
        }
    };
};
//# sourceMappingURL=auth.js.map