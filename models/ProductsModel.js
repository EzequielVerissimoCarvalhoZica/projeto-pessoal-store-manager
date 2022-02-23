const connection = require('./connection');

const getAll = async () => {
  const query = 'SELECT `id`, `name`, `quantity` FROM StoreManager.products ORDER BY id;';

  const [products] = await connection.execute(query);
  return products;
};

const findById = async (id) => {
  const query = 'SELECT`id`,`name`,`quantity` FROM StoreManager.products WHERE id = ? ORDER BY id;';

  const [product] = await connection.execute(query, [id]);

  return product;
};

module.exports = {
  getAll,
  findById,
};