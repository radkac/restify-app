"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = require("@hapi/joi");
const commonKeys = {
    email: Joi.string()
        .email({ minDomainSegments: 2 }),
    username: Joi.string()
        .alphanum()
        .min(3)
        .max(30),
    access_token: Joi.string(),
};
exports.userSchema = Joi.object()
    .keys({
    id: Joi.number(),
    username: commonKeys.username,
    email: commonKeys.email,
})
    .required();
exports.authenticationSchema = Joi.object()
    .keys({
    access_token: commonKeys.access_token,
    email: commonKeys.email,
})
    .required();
exports.createUserSchema = Joi.object()
    .keys({
    email: commonKeys.email,
    username: commonKeys.username,
    access_token: commonKeys.access_token,
})
    .required();
//# sourceMappingURL=user.js.map