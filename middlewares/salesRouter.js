const express = require('express');
const rescue = require('express-rescue');
const salesController = require('../controllers/salesController');
const validateSales = require('./validateSales');

const router = express.Router();

router
.route('/')
.get(rescue(salesController.getAll))
.post(rescue(validateSales.validadeSalesMiddle), rescue(salesController.create));

router
.route('/:id')
.get(rescue(salesController.findById))
.put(rescue(validateSales.validadeSalesMiddle), rescue(salesController.update))
.delete(rescue(salesController.deleteSale));

module.exports = router;
