const joiValidateSales = require('../schemas/joiValidateSales');

module.exports = (req, res, next) => {
  const { quantity, productId } = req.body;

  const { error } = joiValidateSales.validate({ productId, quantity });

  if (error) {
    const [code, message] = error.message.split('|');

    return res.status(code).json(message);
  }

  return next();
};
