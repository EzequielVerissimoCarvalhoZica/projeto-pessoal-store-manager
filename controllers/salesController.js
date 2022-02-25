const salesService = require('../services/salesService');

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
  // let productId;
  // let quantity;
  // // console.log(req.body);
  // if (req.body.length) {
  //   productId = req.body[0].productId;
  //   quantity = req.body[0].quantity;
  // } else {
  //   productId = req.body.productId;
  //   quantity = req.body.quantity;
  // }
  return res.status(201).end();
};

module.exports = {
  getAll,
  findById,
  create,
};
