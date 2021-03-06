import * as Joi from '@hapi/joi';

const userSchema = Joi.object()
  .keys({
    id: Joi.number(),
    username: Joi.string()
      .alphanum()
      .min(3)
      .max(30),
    access_token: Joi.string(),
    email: Joi.string()
      .email({ minDomainSegments: 2 }),
  });

export { userSchema };
