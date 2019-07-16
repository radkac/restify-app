"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const conf = require("../../config");
const userModel_1 = require("./userModel");
exports.auth = (errorHandler) => {
    return {
        /**
         * Function for authentication user by given email and access_token
         */
        authenticate: (email, accessToken) => {
            return new Promise((resolve, reject) => {
                userModel_1.UserModel.findAll({
                    where: { email: email, accessToken: accessToken },
                })
                    .then(usersList => {
                    if (!usersList.length) {
                        return reject(401);
                    }
                    if (usersList === null) {
                        errorHandler(undefined, 'Nepodařilo se vygenerovat veřejný token.');
                        return reject(500);
                    }
                    else {
                        const { email, id } = usersList[0];
                        // use JWT.SECRET for encode
                        const publicToken = jwt.sign({ email, id }, conf.JWT_SECRET, { expiresIn: 60 * 60 * 24 });
                        return resolve(publicToken);
                    }
                });
            });
        },
    };
};
//# sourceMappingURL=auth.js.map