import Joi from 'joi';

const passwordRegExp = () => new RegExp('^[a-zA-Z0-9]{3,30}$');

const firstAndLastnameValidation = Joi.string().alphanum().min(3).max(30).required();

export const CreateUserSchema = Joi.object({
  firstname: firstAndLastnameValidation,

  lastname: firstAndLastnameValidation,

  password: Joi.string().pattern(passwordRegExp()).required(),

  email: Joi.string().email().required(),
});

export const UpdateUserSchema = Joi.object({
  firstname: firstAndLastnameValidation,

  lastname: firstAndLastnameValidation,

  password: Joi.string().pattern(passwordRegExp()),

  email: Joi.string().email(),
});
