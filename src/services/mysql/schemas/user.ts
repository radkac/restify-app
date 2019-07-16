import * as Joi from '@hapi/joi';

const commonKeys = {
  email: Joi.string()
      .email({ minDomainSegments: 2 }),
  username: Joi.string()
    .alphanum()
    .min(3)
    .max(30),
    access_token: Joi.string(),
};

export const userSchema = Joi.object()
  .keys({
    id: Joi.number(),
    username: commonKeys.username,
    email: commonKeys.email,
  })
  .required();

export const authenticationSchema = Joi.object()
  .keys({
    access_token: commonKeys.access_token,
    email: commonKeys.email,
  })
  .required();

export const createUserSchema = Joi.object()
  .keys({
    email: commonKeys.email,
    username: commonKeys.username,
    access_token: commonKeys.access_token,
  })
  .required();
