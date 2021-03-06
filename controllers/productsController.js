const productService = require('../services/productsService');

const getAll = async (_req, res, _next) => {
    const products = await productService.getAll();
    if (products.err) return res.status(products.code).json({ message: products.err });

    return res.status(200).json(products);
};

const findById = async (req, res) => {
    const { id } = req.params;
    const product = await productService.findById(id);

    if (product.err) return res.status(product.code).json({ message: product.err });
    return res.status(200).json(product);
};

const create = async (req, res) => {
  const { quantity, name } = req.body;

  const product = await productService.create({ name, quantity });

  if (product.err) return res.status(product.code).json({ message: product.err });

  return res.status(201).json(product);
};

const update = async (req, res) => {
  // const products = await ProductModel.getAll();
  const { id } = req.params;
  const { quantity, name } = req.body;

  const product = await productService.update({ name, quantity, id });

  if (product.err) return res.status(product.code).json({ message: product.err });

  return res.status(200).json(product);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  const product = await productService.deleteProduct({ id });

  if (product.err) return res.status(product.code).json({ message: product.err });

  return res.status(204).end();
};

module.exports = {
  getAll,
  findById,
  create,
  update,
  deleteProduct,
};
