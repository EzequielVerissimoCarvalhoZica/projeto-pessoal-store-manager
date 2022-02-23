const sinon = require('sinon');
const { expect } = require('chai');

const DB = require('../../../models/connection');
const ProductsModels = require('../../../models/ProductsModel');

describe('MODEL PRODUCTS TESTS', () => {
  const executeResponseHave = [
    { id: 1, name: 'Martelo de Thor', quantity: 10 },
    { id: 2, name: 'Traje de encolhimento', quantity: 20 },
    { id: 3, name: 'Escudo do Capitão América', quantity: 30 }
  ];

  const executeResponseNotHave = [];

  describe('Lista todos os produtos', () => {
    describe('Testa quando tem produtos', () => {
      before(() => {
        sinon.stub(DB, 'execute').resolves(executeResponseHave);
      })
  
      after(() => {
        DB.execute.restore();
      });

      it('Me retorna todos produtos', async () => {
        const modelResponse = await ProductsModels.getAll();
        expect(modelResponse).to.be.equal(modelResponse);
      });
    });
    describe('Testa quando não tem produtos', () => {
      before(() => {
        sinon.stub(DB, 'execute').resolves(executeResponseNotHave);
      })
  
      after(() => {
        DB.execute.restore();
      });
      it('Me retorna todos produtos', async () => {
        const modelResponse = await ProductsModels.getAll();
        expect(modelResponse).to.be.deep.equal(modelResponse);
      });
    });
  });
  describe('Lista produto pelo ID', () => {

    
    
    describe('Testa quando tem o produto', () => {
      const product = [ { id: 1, name: 'Martelo de Thor', quantity: 10 } ];
      const executeResponse = [ { id: 1, name: 'Martelo de Thor', quantity: 10 } ];
      const productId = {
        id: 1,
      };
  
      before(() => {
        sinon.stub(DB, 'execute').resolves(executeResponse);
      })
  
      after(() => {
        DB.execute.restore();
      });

      it('retorna produto com id 1', async () => {
        const modelResponse = await ProductsModels.findById(productId.id);
        console.log(modelResponse, product);
        expect(modelResponse).to.be.deep.equal(product[0]);
      })
    });
    describe('Testa quando não tem produto', () => {
      const product = [];
      const executeResponse = [];
      const productId = {
        id: 7,
      };

      before(() => {
        sinon.stub(DB, 'execute').resolves(executeResponse);
      })
  
      after(() => {
        DB.execute.restore();
      });
  
      it('nao retorna nada passando um id que nao existe', async () => {
        const modelResponse = await ProductsModels.findById(productId.id);

        expect(modelResponse).to.deep.equal(product);
      })
    });
  });
});
