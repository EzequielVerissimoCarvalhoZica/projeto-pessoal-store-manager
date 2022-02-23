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

module.exports = {
  getAll,
  findById,
};