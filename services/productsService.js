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

const create = async ({ name, quantity }) => {
  const products = await ProductModel.getAll();

  const haveProduct = products.some((p) => p.name === name);

  if (haveProduct) return { err: 'Product already exists', code: 409 };

  const id = await ProductModel.create({ name, quantity });

  return { id, name, quantity };
};

const update = async ({ name, quantity, id }) => {
  const productId = await findById(id);

  if (productId.err) return productId;

  await ProductModel.update({ name, quantity, id });
  return { id, name, quantity };
};

const deleteProduct = async ({ id }) => {
  const productId = await findById(id);

  if (productId.err) return productId;

  const product = await ProductModel.deleteProduct({ id });
  return product;
};

module.exports = {
  getAll,
  findById,
  create,
  update,
  deleteProduct,
};