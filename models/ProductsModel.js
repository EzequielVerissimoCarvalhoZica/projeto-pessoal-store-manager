const connection = require('./connection');

const getAll = async () => {
  const query = 'SELECT `id`, `name`, `quantity` FROM StoreManager.products ORDER BY id;';

  const [products] = await connection.execute(query);

  return products;
};

const findById = async (id) => {
  const query = 'SELECT`id`,`name`,`quantity` FROM StoreManager.products WHERE id = ? ORDER BY id;';

  const [product] = await connection.execute(query, [id]);
  if (!product) return [];
  return product;
};

const create = async ({ name, quantity }) => {
  const query = 'INSERT INTO `StoreManager`.`products` (`name`, `quantity`) VALUES (?, ?);';
  const [product] = await connection.execute(query, [name, quantity]);

  return product.insertId;
};

const update = async ({ name, quantity, id }) => {
  const query = `UPDATE StoreManager.products
  SET name = ?, quantity = ?
  WHERE id = ?;`;

  const [product] = await connection.execute(query, [name, quantity, id]);

  return product;
};

const deleteProduct = async ({ id }) => {
  const query = 'DELETE FROM `StoreManager`.`products` WHERE id = ?;';

  const product = await connection.execute(query, [id]);

  return product;
};

module.exports = {
  getAll,
  findById,
  create,
  update,
  deleteProduct,
};