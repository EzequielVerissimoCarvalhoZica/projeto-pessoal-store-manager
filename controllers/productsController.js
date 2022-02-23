const productService = require('../services/productsService');

const getAll = async (_req, res, next) => {
  try {
    const products = await productService.getAll();
    return res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

const findById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await productService.findById(id);
    if (product.err) return res.status(product.code).json({ message: product.err });

    return res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  findById,
};
