const SalesModel = require('../models/SalesModel');

const getAll = async () => {
  const sales = await SalesModel.getAll();

  const salesList = sales.map((sale) => (
    {
      saleId: sale.id,
      date: sale.date,
      productId: sale.product_id,
      quantity: sale.quantity,
    }
  ));
  return salesList;
};

const findById = async (id) => {
  const date = await SalesModel.findById(id);

  if (date.length === 0) return { err: 'Sale not found', code: 404 };
  const salesList = date.map((s) => (
    {
      date: s.date,
      productId: s.product_id,
      quantity: s.quantity,
    }
  ));

  return salesList;
};

module.exports = {
  getAll,
  findById,
};