const connection = require('./connection');

const query1 = 'SELECT s.id, s.date, sp.product_id, sp.quantity FROM StoreManager.sales AS s ';
const query2 = 'INNER JOIN StoreManager.sales_products AS sp ON s.id = sp.sale_id ';
const query3 = 'ORDER BY s.id, sp.product_id;';

const getAll = async () => {
  const query = query1 + query2 + query3;
  const [sales] = await connection.execute(
      query,
  );
  return sales;
};

const findById = async (id) => {
  const extraQuery = ' WHERE s.id = ? ';
  const query = query1 + query2 + extraQuery + query3;

  const [sale] = await connection.execute(query, [id]);

  return sale;
};

const removeQuantity = async (productId, quantity) => {
  const query = `UPDATE StoreManager.products
  SET quantity = quantity - ?
  WHERE id = ?;`;

  await connection.execute(query, [quantity, productId]);
};

const createSale = async () => {
  const query = 'INSERT INTO StoreManager.sales (date) VALUES (NOW());';
  const [sale] = await connection.execute(query);

  return sale.insertId;
};

const getProductQuantity = async (id) => {
  const query = 'SELECT quantity FROM StoreManager.products WHERE id = ?;';

  const [quantity] = await connection.execute(query, [id]);
  return quantity[0];
};

const createSaleProduct = async (saleId, productId, quantity) => {
  const query = `INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES
  (?, ?, ?);`;
  const quantityProduct = await getProductQuantity(productId);

  if (quantityProduct.quantity < quantity) {
    return { err: 'Such amount is not permitted to sell' };
  }
  const create = connection.execute(query, [saleId, productId, quantity]);
  const quantityUpdated = removeQuantity(productId, quantity);

  const result = await Promise.all([create, quantityUpdated]);
  return result;
};

const update = async ({ productId, quantity, id }) => {
  const query = `UPDATE StoreManager.sales_products
  SET product_id = ?, quantity = ?
  WHERE sale_id = ?;`;

  await connection.execute(query, [productId, quantity, id]);
};

const restoreQuantity = async (saleId) => {
  const query = `UPDATE StoreManager.products AS p
  INNER JOIN StoreManager.sales_products AS sp
  ON sp.product_id = p.id
  SET p.quantity = p.quantity + sp.quantity
  WHERE id = ?;`;
  const [productId] = await findById(saleId);

  await connection.execute(query, [productId.product_id]);
};
const deleteSale = async ({ id }) => {
  await restoreQuantity(id);
  const query = 'DELETE FROM `StoreManager`.`sales_products` WHERE sale_id = ?;';
  const response = await connection.execute(query, [id]);

  return response;
};

module.exports = {
  getAll,
  findById,
  createSale,
  createSaleProduct,
  update,
  deleteSale,
};