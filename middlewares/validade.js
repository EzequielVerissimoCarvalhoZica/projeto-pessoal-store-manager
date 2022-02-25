const validateQuantity = (quantity) => {
  if (quantity < 1) {
    return { message: '"quantity" must be greater than or equal to 1', code: 422 };  
  }
  if (!quantity) return { message: '"quantity" is required', code: 400 };
};

const validateName = (name) => {
  if (!name) return { message: '"name" is required', code: 400 };
  if (name.length < 5) {
    return { message: '"name" length must be at least 5 characters long', code: 422 };
  }
};

const validateProductId = (productId) => {
  if (!productId) return { message: '"productId" is required', code: 400 };
};

const validadeProducts = (req, res, next) => {
  const { name, quantity } = req.body;
  const resultQuantity = validateQuantity(quantity);
  const resultName = validateName(name);

  if (resultQuantity) {
    return res.status(resultQuantity.code).json(resultQuantity.message);
  }
  if (resultName) {
    return res.status(resultName.code).json(resultName.message);
  }
  return next();
};

const validadeSales = (req, res, next) => {
  const { productId, quantity } = req.body;
  const resultQuantity = validateQuantity(quantity);
  const resultProductId = validateProductId(productId);

  if (resultQuantity) {
    console.log(resultQuantity.message);
    return res.status(resultQuantity.code).json({ message: resultQuantity.message });
  }
  if (resultProductId) {
    console.log(resultProductId.message);

    return res.status(resultProductId.code).json({ message: resultProductId.message });
  }
  return next();
};

module.exports = {
  validadeProducts,
  validadeSales,
};