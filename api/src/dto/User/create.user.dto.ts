import Joi from 'joi';

const passwordRegExp = new RegExp('^[a-zA-Z0-9]{3,30}$');
const passwordBaseSchema = Joi.string().alphanum().min(3).max(30);
const firstAndLastnameValidation = Joi.string().alphanum().min(3).max(30).required();
export const emailBaseSchema = Joi.string().email();

export const CreateUserSchema = Joi.object({
  firstname: firstAndLastnameValidation,

  lastname: firstAndLastnameValidation,

  password: passwordBaseSchema.required(),

  email: emailBaseSchema.required(),
});

export const UpdateUserSchema = Joi.object({
  firstname: firstAndLastnameValidation,

  lastname: firstAndLastnameValidation,

  password: Joi.string().pattern(passwordRegExp),

  email: emailBaseSchema.required(),
});
