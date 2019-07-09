"use strict";
var Joi = require("@hapi/joi");
var endpointSchema = Joi.object().keys({
    id: Joi.number(),
    name: Joi.string().alphanum().min(1).max(30),
    url: Joi.string().uri().min(6),
    creation: Joi.date(),
    last_check: Joi.date(),
    interval: Joi.number().min(3),
    user_id: Joi.number()
});
exports.__esModule = true;
exports["default"] = endpointSchema;
