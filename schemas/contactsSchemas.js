import Joi from "joi";


export const createContactSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string()
        .pattern(/^[0-9+\-() ]{7,20}$/)
        .required()
        .error(new Error("Phone number must be a number and can includes +, -, spaces and parentheses")),
    favorite: Joi.boolean(),  //TODO check favorite in db
});

export const updateContactSchema = Joi.object({
    name: Joi.string().max(150),
    email: Joi.string().email(),
    phone: Joi.string(),
    favorite: Joi.boolean(),
}).min(1).error(new Error("Body must have at least one field"));

