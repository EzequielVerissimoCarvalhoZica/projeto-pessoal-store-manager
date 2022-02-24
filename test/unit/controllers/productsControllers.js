const sinon = require('sinon');
const { expect } = require('chai');
const ProductsService = require('../../../services/productsService');
const ProductsController = require('../../../controllers/productsController');

describe('CONTROLLER PRODUCTS TESTS', () => {
  const request = {};
  const response = {};
  let next = () => {};

  before(() => {
    response.status =  sinon.stub().returns(response);
    response.json =  sinon.stub().returns();
    next =  sinon.stub().returns();
  });
  describe('Testa quando faz requisicao para todos os produtos', () => {
    describe('Testa quando tem os produtos', () => {
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
        sinon.stub(ProductsService, 'getAll').resolves(getAllProductResponseService);
      });
      after(() => {
        ProductsService.getAll.restore();
      });

      it('Responde com lista de produtos', async () => {
        await ProductsController.getAll(request, response, next);

        expect(response.status.calledWith(200)).to.be.true;
      });
    });
    describe('Testa quando nao tem os produtos', () => {
      const getAllProductResponseService = { err: 'Products not found', code: 404 };

      before(() => {
        sinon.stub(ProductsService, 'getAll').resolves(getAllProductResponseService);
      });
      after(() => {
        ProductsService.getAll.restore();
      });

      it('Responde com objeto "Products not found" e status "404"', async () => {
        await ProductsController.getAll(request, response, next);

        expect(response.status.calledWith(404)).to.be.true;
      });
    });
  });
  describe('Testa quando faz requisicao por produto expecifico', () => {
    describe('Testa quando tem o produto', () => {
      const findByIdProductResponseService = {
        id: 1,
        name: 'Martelo de Thor',
        quantity: 10
      };

      before(() => {
        sinon.stub(ProductsService, 'findById').resolves(findByIdProductResponseService);
      });
      after(() => {
        ProductsService.findById.restore();
      });

      it('Chama res.status com status 200', async () => {
        request.params = {id: 1};
        await ProductsController.findById(request, response, next);

        expect(response.status.calledWith(200)).to.be.true;
      });

      it('Chama res.json com o produto encontrado', async () => {
        request.params = {id: 1};
        await ProductsController.findById(request, response, next);

        expect(response.json.calledWith(findByIdProductResponseService)).to.be.true;
      });
    });
    describe('Testa quando nao tem o produto', () => {
      const findByIdProductResponseService = { err: 'Product not found', code: 404 };
      const findByIdProductResponseController = { message: 'Product not found'};

      before(() => {
        sinon.stub(ProductsService, 'findById').resolves(findByIdProductResponseService);
      });
      after(() => {
        ProductsService.findById.restore();
      });

      it('Chama res.status com status 200', async () => {
        await ProductsController.findById(request, response, next);

        expect(response.status.calledWith(404)).to.be.true;
      });

      it('Chama res.json com o obj "{ message: "Product not found", code: 404 }" ', async () => {
        await ProductsController.findById(request, response, next);

        expect(response.json.calledWith(findByIdProductResponseController)).to.be.true;
      });
    });
  });
});
