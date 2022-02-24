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

module.exports = {
  getAll,
  findById,
  create,
};