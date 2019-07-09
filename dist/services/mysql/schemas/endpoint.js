"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = require("@hapi/joi");
const endpointSchema = Joi.object().keys({
    id: Joi.number(),
    name: Joi.string().alphanum().min(1).max(30),
    url: Joi.string().uri().min(6),
    creation: Joi.date(),
    last_check: Joi.date(),
    interval: Joi.number().min(3),
    user_id: Joi.number()
});
exports.default = endpointSchema;
//# sourceMappingURL=endpoint.js.map