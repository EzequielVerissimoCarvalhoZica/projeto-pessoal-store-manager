const ProductModel = require('../models/ProductsModel');

const getAll = async () => {
  const products = await ProductModel.getAll();
  if (products.length === 0) return { err: 'Products not found', code: 404 };
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