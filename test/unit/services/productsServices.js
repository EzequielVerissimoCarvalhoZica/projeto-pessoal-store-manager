const sinon = require('sinon');
const { expect } = require('chai');
const ProductsService = require('../../../services/productsService');
const ProductsModels = require('../../../models/ProductsModel');

describe('SERVICE PRODUCTS TESTS', () => {
  describe('Lista todos os produtos', () => {
    describe('Testa quando tem os produtos', () => {
      const getAllProductResponseModel = [
        {
          id: 1,
          name: 'Martelo de Thor',
          quantity: 10
        },
        {
          id: 2,
          name: 'Traje de encolhimento',
          quantity: 20
        },
        {
          id: 3,
          name: 'Escudo do Capitão América',
          quantity: 30
        }
      ];
      const getAllProductResponseService = [
        {
          id: 1,
          name: 'Martelo de Thor',
          quantity: 10
        },
        {
          id: 2,
          name: 'Traje de encolhimento',
          quantity: 20
        },
        {
          id: 3,
          name: 'Escudo do Capitão América',
          quantity: 30
        }
      ];

      before(() => {
        sinon.stub(ProductsModels, 'getAll').resolves(getAllProductResponseModel);
      });
      after(() => {
        ProductsModels.getAll.restore();
      });
      it('Retorna objeto com os produtos', async () => {
        const response = await ProductsService.getAll();

        expect(response).to.deep.equal(getAllProductResponseService)
      })
    });
    describe('Testa quando nao tem os produtos', () => {
      const getAllProductResponseModel = [];
      const getAllProductResponseService = { err: 'Products not found', code: 404 };

      before(() => {
        sinon.stub(ProductsModels, 'getAll').resolves(getAllProductResponseModel)
      });
      after(() => {
        ProductsModels.getAll.restore();
      });

      it('Retorna objeto "Products not found" e status "404"', async () => {{
        const response = await ProductsService.getAll();

        expect(response).to.deep.equal(getAllProductResponseService);
      }});
    });
  });
  describe('Lista produto pelo ID', () => {
    describe('Testa quando tem o produto', () => {
      const findByIdProductResponseModel = [ { id: 1, name: 'Martelo de Thor', quantity: 10 } ];
      const findByIdProductResponseService = { id: 1, name: 'Martelo de Thor', quantity: 10 };
      const id = 1

      before(() => {
        sinon.stub(ProductsModels, 'findById').resolves(findByIdProductResponseModel);
      });
      after(() => {
        ProductsModels.findById.restore();
      });
      it('Retorna objeto com o produto', async () => {
        const response = await ProductsService.findById(id);

        expect(response).to.deep.equal(findByIdProductResponseService)
      })
    });
    describe('Testa quando nao tem o produto', () => {
      const findByIdProductResponseModel = [];
      const findByIdProductResponseService = { err: 'Product not found', code: 404 };
      const id = 7

      before(() => {
        sinon.stub(ProductsModels, 'findById').resolves(findByIdProductResponseModel);
      });
      after(() => {
        ProductsModels.findById.restore();
      });
  
      it('Retorna objeto "Product not found" e status "404"', async () => {
        const response = await ProductsService.findById(id);

        expect(response).to.deep.equal(findByIdProductResponseService)
      })
    });
  });
});