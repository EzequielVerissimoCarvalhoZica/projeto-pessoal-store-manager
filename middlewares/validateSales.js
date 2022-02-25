const joiValidateSales = require('../schemas/joiValidateSales');

const bodyTransform = (body) => {
  if (Array.isArray(body)) {
    const salesList = body.map((e) => (
      {
        productId: e.productId,
        quantity: e.quantity,
      }
    ));
    return salesList;
  } 
    return false;
};

const validadeSalesMiddle = (req, res, next) => {
  const salesList = bodyTransform(req.body);
  let erro;

  // console.log(salesList);
  salesList.forEach(({ productId, quantity }) => {
    const { error } = joiValidateSales.validate({ productId, quantity });
    if (error) {
      erro = error;
    }
  });
  // console.log(erro);
  if (erro) {
    const [code, message] = erro.message.split('|');
    return res.status(code).json({ message });
  }
  return next();
};

module.exports = {
  validadeSalesMiddle,
};
