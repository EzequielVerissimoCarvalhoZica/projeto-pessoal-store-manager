const salesService = require('../services/salesService');
const bodyTransform = require('../schemas/bodyTransform');

const getAll = async (_req, res) => {
    const sales = await salesService.getAll();
    return res.status(200).json(sales);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const sale = await salesService.findById(id);

  if (sale.err) return res.status(sale.code).json({ message: sale.err });

  return res.status(200).json(sale);
};

const create = async (req, res) => {
  const bodyRequestList = bodyTransform(req.body);

  const salesList = await salesService.create(bodyRequestList);
  // if (salesList.err) return res.status(salesList.code).json({ message: salesList.err });

  return res.status(salesList.code).json(salesList.message);
};

const update = async (req, res) => {
  const { id } = req.params;
  const [body] = req.body;
  const { quantity, productId } = body;

  const sale = await salesService.update({ productId, quantity, id });

  if (sale.err) return res.status(sale.code).json({ message: sale.err });
  return res.status(200).json(sale);
};

const deleteSale = async (req, res) => {
  const { id } = req.params;

  const sale = await salesService.deleteSale({ id });

  if (sale.err) return res.status(sale.code).json({ message: sale.err });

  return res.status(204).end();
};

module.exports = {
  getAll,
  findById,
  create,
  update,
  deleteSale,
};
