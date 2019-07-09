"use strict";
var Joi = require("@hapi/joi");
var resultSchema = Joi.object().keys({
    id: Joi.number(),
    last_check: Joi.date(),
    http_status: Joi.number(),
    payload: Joi.string(),
    endpoint_id: Joi.number()
});
exports.__esModule = true;
exports["default"] = resultSchema;
