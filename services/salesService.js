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
  const bodyRequestList = date.map((s) => (
    {
      date: s.date,
      productId: s.product_id,
      quantity: s.quantity,
    }
  ));

  return bodyRequestList;
};

const create = async (body) => {
  const itemsSold = [];
  const id = await SalesModel.createSale();

  body.forEach(({ productId, quantity }) => {
    itemsSold.push({
      productId,
      quantity,
    });
    SalesModel.createSaleProduct(id, productId, quantity);
  });

  return {
    id,
    itemsSold,
  };
};

const bodyTransform = (body) => {
  if (Array.isArray(body)) {
    const salesList = body.map((e) => (
      {
        productId: e.productId,
        quantity: e.quantity,
      }
    ));
    return salesList;
  } 
    return { err: 'Wrong fields', code: 400 };
};

module.exports = {
  getAll,
  findById,
  bodyTransform,
  create,
};