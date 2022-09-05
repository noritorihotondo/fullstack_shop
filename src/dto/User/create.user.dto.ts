import Joi from 'joi';

const generatePassword = () => {
    return new RegExp('^[a-zA-Z0-9]{3,30}$')
};

export const CreateUserSchema = Joi.object({
    firstname: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    lastname: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    password: Joi.string()
        .pattern(generatePassword())
        .required(),

    email: Joi.string()
        .email()
        .required(),
});

export const UpdateUserSchema = Joi.object({
    firstname: Joi.string()
        .alphanum()
        .min(3)
        .max(30),

    lastname: Joi.string()
        .alphanum()
        .min(3)
        .max(30),

    password: Joi.string()
        .pattern(generatePassword()),

    email: Joi.string()
        .email()
})