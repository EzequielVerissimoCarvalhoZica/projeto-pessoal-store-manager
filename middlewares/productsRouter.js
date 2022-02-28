const express = require('express');
const rescue = require('express-rescue');
const productsController = require('../controllers/productsController');
const validateProducts = require('./validateProducts');

const router = express.Router();

router
.route('/')
.get(rescue(productsController.getAll))
.post(rescue(validateProducts), rescue(productsController.create));

router
.route('/:id')
.get(rescue(productsController.findById))
.put(rescue(validateProducts), rescue(productsController.update))
.delete(rescue(productsController.deleteProduct));

module.exports = router;
