import Joi from "joi";

const orderValidationSchema = Joi.object({
    productName: Joi.string().required().messages({
        'any.required': 'Product name is required.',
        'string.base': 'Product name must be a string.',
    }),
    price: Joi.number().required().messages({
        'any.required': 'Price is required.',
        'number.base': 'Price must be a number.',
    }),
    quantity: Joi.number().required().messages({
        'any.required': 'Quantity is required.',
        'number.base': 'Quantity must be a number.',
    }),
});


export default orderValidationSchema