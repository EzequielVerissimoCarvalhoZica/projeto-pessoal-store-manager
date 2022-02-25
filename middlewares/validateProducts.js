const joiValidateProducts = require('../schemas/joiValidateProducts');

module.exports = (req, res, next) => {
  const { quantity, name } = req.body;

  const { error } = joiValidateProducts.validate({ quantity, name });

  if (error) {
    const [code, message] = error.message.split('|');

    return res.status(code).json({ message });
  }

  return next();
};
