const sinon = require('sinon');
const { expect } = require('chai');

const DB = require('../../../models/connection');
const SalesModel = require('../../../models/SalesModel');

describe('MODEL SALES TESTS', () => {

  describe('Lista todos os sales', () => {
    const executeResponse = [[      {
      id: 1, date: "2022-02-24T15:41:22.000Z",
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
    }]];

    describe('Testa quando tem sales', () => {
      before(() => {
        sinon.stub(DB, 'execute').resolves(executeResponse);
      })
  
      after(() => {
        DB.execute.restore();
      });

      it('Me retorna todos sales', async () => {
        const modelResponse = await SalesModel.getAll();
        expect(modelResponse).to.deep.equal(executeResponse[0])
        
      });
    });
  });

  describe('Lista sales pelo ID', () => {
    describe('Testa quando tem o sale', () => {
      const executeResponse = [[
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
        }],[]];

      const productId = 1;
  
      before(() => {
        sinon.stub(DB, 'execute').resolves(executeResponse);
      })
  
      after(() => {
        DB.execute.restore();
      });

      it('retorna sales com id 1', async () => {
        const modelResponse = await SalesModel.findById(productId);

        expect(modelResponse).to.be.deep.equal(executeResponse[0]);
      })
    });
  });
});
