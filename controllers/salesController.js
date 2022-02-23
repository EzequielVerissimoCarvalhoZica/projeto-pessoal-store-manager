const salesService = require('../services/salesService');

const getAll = async (_req, res, next) => {
  try {
    const sales = await salesService.getAll();
    return res.status(200).json(sales);
  } catch (error) {
    next(error);
  }
};

const findById = async (req, res, next) => {
try {
  const { id } = req.params;
  const sale = await salesService.findById(id);

  if (sale.err) return res.status(sale.code).json({ message: sale.err });

  return res.status(200).json(sale);
} catch (error) {
  next(error);
}
};

module.exports = {
  getAll,
  findById,
};
