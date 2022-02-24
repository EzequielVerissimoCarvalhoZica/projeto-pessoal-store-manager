const joiValidateSales = require('../schemas/joiValidateSales');

module.exports = (req, res, next) => {
  let productId;
  let quantity;

  if (req.body.length) {
    productId = req.body[0].productId;
    quantity = req.body[0].quantity;
  } else {
    productId = req.body.productId;
    quantity = req.body.quantity;
  }
  const { error } = joiValidateSales.validate({ productId, quantity });

  if (error) {
    const [code, message] = error.message.split('|');

    return res.status(code).json(message);
  }

  return next();
};
