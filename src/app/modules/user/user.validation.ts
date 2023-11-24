import Joi from "joi";
import orderValidationSchema from "../order/order.validation";

const nameValidationSchema = Joi.object({
    firstName: Joi.string().required().messages({
        'any.required': 'User firstname is required.',
        'string.base': 'First name must be a string.',
    }),
    lastName: Joi.string().required().messages({
        'any.required': 'User lastname is required.',
        'string.base': 'Last name must be a string.',
    }),
});

const addressValidationSchema = Joi.object({
    street: Joi.string().required().messages({
        'any.required': 'Street is required.',
        'string.base': 'Street must be a string.',
    }),
    city: Joi.string().required().messages({
        'any.required': 'City is required.',
        'string.base': 'City must be a string.',
    }),
    country: Joi.string().required().messages({
        'any.required': 'Country is required.',
        'string.base': 'Country must be a string.',
    }),
});

const userValidationSchema = Joi.object({
    userId: Joi.number().required().messages({
        'any.required': 'User id is required.',
        'string.base': 'User id must be a number.',
    }),
    username: Joi.string().required().messages({
        'any.required': 'Username is required.',
        'string.base': 'Username must be a string.',
    }),
    password: Joi.string().required().messages({
        'any.required': 'Password is required.',
        'string.base': 'Password must be a string.',
    }),
    fullName: nameValidationSchema,
    age: Joi.number().required().messages({
        'any.required': 'Age is required.',
        'number.base': 'Age must be a number.',
    }),
    email: Joi.string().email().required().messages({
        'any.required': 'Email is required.',
        'string.base': 'Email must be a string.',
        'string.email': 'Email must be a valid email address.',
    }),
    isActive: Joi.boolean(),
    hobbies: Joi.array().items(Joi.string()).required().messages({
        'any.required': 'Hobbies are required.',
        'array.base': 'Hobbies must be an array.',
    }),
    address: addressValidationSchema,
    orders: Joi.array().items(orderValidationSchema),
});

export default userValidationSchema;
