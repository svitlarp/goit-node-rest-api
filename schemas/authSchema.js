import Joi from "joi";
import { emailRegex, subscriptionList } from "../constants/authConstants.js";


export const authRegisterSchema = Joi.object({
    email: Joi.string().pattern(emailRegex).required(),
    password: Joi.string().required(),
    subscription: Joi.string().valid("starter", "pro", "business"),
    token: Joi.string(),
});

export const authLoginSchema = Joi.object({
    email: Joi.string().pattern(emailRegex).required(),
    password: Joi.string().min(6).required(),
});

export const authUpdateSubscriptionSchema = Joi.object({
    subscription: Joi.string().valid(...subscriptionList).required(),
});

