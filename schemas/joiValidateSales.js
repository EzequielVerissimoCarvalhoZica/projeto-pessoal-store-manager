const Joi = require('joi');

module.exports = Joi.object({
  productId: Joi.string().required().messages({
    'any.required': '400|"productId" is required',
  }),
  quantity: Joi
  .number()
  .integer()
  .positive()
  .strict()
  .required()
  .messages({
    'any.required': '400|"quantity" is required',
    'number.positive': '422|"quantity" must be greater than or equal to 1',
  }),
});