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

  const createdListPending = body.map(({ productId, quantity }) => {
    itemsSold.push({
      productId,
      quantity,
    });
    return SalesModel.createSaleProduct(id, productId, quantity);
  });
  await Promise.all(createdListPending);

  return {
    id,
    itemsSold,
  };
};

const update = async ({ productId, quantity, id }) => {
  const saleId = await findById(id);

  if (saleId.err) return saleId;

  await SalesModel.update({ productId, quantity, id });
  return {
    saleId: id,
    itemUpdated: [
      {
        productId,
        quantity,
      },
    ],
  };
};

const deleteSale = async ({ id }) => {
  const saleId = await findById(id);

  if (saleId.err) return saleId;

  const response = await SalesModel.deleteSale({ id });
  return response;
};

module.exports = {
  getAll,
  findById,
  create,
  update,
  deleteSale,
};