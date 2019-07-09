"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = require("@hapi/joi");
const resultSchema = Joi.object().keys({
    id: Joi.number(),
    last_check: Joi.date(),
    http_status: Joi.number(),
    payload: Joi.string(),
    endpoint_id: Joi.number()
});
exports.default = resultSchema;
//# sourceMappingURL=result.js.map