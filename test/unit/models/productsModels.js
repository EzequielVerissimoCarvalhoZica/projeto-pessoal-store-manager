const sinon = require('sinon');
const { expect } = require('chai');

const DB = require('../../../models/connection');
const ProductsModels = require('../../../models/ProductsModel');

describe('MODEL PRODUCTS TESTS', () => {
  const executeResponse = []

  const modelSuccessResponse = {
    "id": 1,
    "name": "Copão do Mc de Agua", 
    "capacity": 700
  }

  describe('Lista todos os produtos', () => {
    describe('Testa quando tem produtos', () => {});
    describe('Testa quando não tem produtos', () => {});
  });
  describe('Lista produto pelo ID', () => {
    describe('Testa quando tem o produto', () => {});
    describe('Testa quando não tem produto', () => {});
  });
});
