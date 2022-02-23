const ProductModel = require('../models/ProductsModel');

const getAll = async () => {
  const products = await ProductModel.getAll();
  return products;
};

const findById = async (id) => {
  const date = await ProductModel.findById(id);
  if (date.length === 0) return { err: 'Product not found', code: 404 };

  const [product] = date;
  return product;
};

module.exports = {
  getAll,
  findById,
};