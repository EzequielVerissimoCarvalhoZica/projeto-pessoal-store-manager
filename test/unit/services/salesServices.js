const sinon = require('sinon');
const { expect } = require('chai');

const DB = require('../../../models/connection');
const SalesModel = require('../../../models/SalesModel');
const SalesService = require('../../../services/salesService');

describe('SERVICE SALES TESTS', () => {
  describe('Lista todos os sales', () => {
    describe('Testa quando tem os sales', () => {
      const getAllSalesResponseModel = [
        {
          id: 1,
          date: "2022-02-24T15:41:22.000Z",
          product_id: 1,
          quantity: 5
        },
        {
          id: 1,
          date: "2022-02-24T15:41:22.000Z",
          product_id: 2,
          quantity: 10
        },
        {
          id: 2,
          date: "2022-02-24T15:41:22.000Z",
          product_id: 3,
          quantity: 15
        }
      ];
      const getAllSalesResponseService = [
        {
          saleId: 1,
          date: "2022-02-24T15:41:22.000Z",
          productId: 1,
          quantity: 5
        },
        {
          saleId: 1,
          date: "2022-02-24T15:41:22.000Z",
          productId: 2,
          quantity: 10
        },
        {
          saleId: 2,
          date: "2022-02-24T15:41:22.000Z",
          productId: 3,
          quantity: 15
        }
      ];

      before(() => {
        sinon.stub(SalesModel, 'getAll').resolves(getAllSalesResponseModel);
      });
      after(() => {
        SalesModel.getAll.restore();
      });
      it('Retorna objeto com os sales', async () => {
        const response = await SalesService.getAll();

        expect(response).to.deep.equal(getAllSalesResponseService)
      })
    });
  });
  describe('Lista produto pelo ID', () => {
    describe('Testa quando tem o produto', () => {
      const findByIdSalesResponseModel = [
        {
          id: 1,
          date: "2022-02-24T15:41:22.000Z",
          product_id: 1,
          quantity: 5
        },
        {
          id: 1,
          date: "2022-02-24T15:41:22.000Z",
          product_id: 2,
          quantity: 10
        }
      ];
      const findByIdSalesResponseService = [
        {
          date: "2022-02-24T15:41:22.000Z",
          productId: 1,
          quantity: 5
        },
        {
          date:
          "2022-02-24T15:41:22.000Z",
          productId: 2,
          quantity: 10
        }
      ];
      const id = 1

      before(() => {
        sinon.stub(SalesModel, 'findById').resolves(findByIdSalesResponseModel);
      });
      after(() => {
        SalesModel.findById.restore();
      });
      it('Retorna objeto com o produto', async () => {
        const response = await SalesService.findById(id);

        expect(response).to.deep.equal(findByIdSalesResponseService)
      })
    });
    describe('Testa quando nao tem o produto', () => {
      const findByIdSalesResponseModel = [];
      const findByIdSalesResponseService = { err: 'Sale not found', code: 404 };
      const id = 7

      before(() => {
        sinon.stub(SalesModel, 'findById').resolves(findByIdSalesResponseModel);
      });
      after(() => {
        SalesModel.findById.restore();
      });
  
      it('Retorna objeto "Product not found" e status "404"', async () => {
        const response = await SalesService.findById(id);

        expect(response).to.deep.equal(findByIdSalesResponseService)
      })
    });
  });
});