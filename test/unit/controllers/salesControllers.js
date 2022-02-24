const sinon = require('sinon');
const { expect } = require('chai');
const salesService = require('../../../services/salesService');
const salesController = require('../../../controllers/salesController');

describe('CONTROLLER SALES TESTS', () => {
  const request = {};
  const response = {};
  let next = () => {};

  before(() => {
    response.status =  sinon.stub().returns(response);
    response.json =  sinon.stub().returns();
    next =  sinon.stub().returns();
  });
  describe('Testa quando faz requisicao para todos os sales', () => {
    describe('Testa quando tem os sales', () => {
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
        sinon.stub(salesService, 'getAll').resolves(getAllSalesResponseService);
      });
      after(() => {
        salesService.getAll.restore();
      });

      it('Responde com lista de sales', async () => {
        await salesController.getAll(request, response, next);

        expect(response.status.calledWith(200)).to.be.true;
      });
    });
    // describe('Testa quando nao tem os sales', () => {
    //   const getAllSalesResponseService = {};

    //   before(() => {
    //     sinon.stub(salesService, 'getAll').resolves(getAllSalesResponseService);
    //   });
    //   after(() => {
    //     salesService.getAll.restore();
    //   });

    //   it('Responde com objeto "Products not found" e status "404"', async () => {
    //     await salesController.getAll(request, response, next);

    //     expect(response.status.calledWith(404)).to.be.true;
    //   });
    // });
  });
  describe('Testa quando faz requisicao por produto expecifico', () => {
    describe('Testa quando tem o produto', () => {
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

      before(() => {
        sinon.stub(salesService, 'findById').resolves(findByIdSalesResponseService);
      });
      after(() => {
        salesService.findById.restore();
      });

      it('Chama res.status com status 200', async () => {
        request.params = {id: 1};
        await salesController.findById(request, response, next);

        expect(response.status.calledWith(200)).to.be.true;
      });

      it('Chama res.json com o produto encontrado', async () => {
        request.params = {id: 1};
        await salesController.findById(request, response, next);

        expect(response.json.calledWith(findByIdSalesResponseService)).to.be.true;
      });
    });
    describe('Testa quando nao tem o produto', () => {
      const findByIdProductResponseService = { err: 'Product not found', code: 404 };
      const findByIdProductResponseController = { message: 'Product not found'};

      before(() => {
        sinon.stub(salesService, 'findById').resolves(findByIdProductResponseService);
      });
      after(() => {
        salesService.findById.restore();
      });

      it('Chama res.status com status 200', async () => {
        await salesController.findById(request, response, next);

        expect(response.status.calledWith(404)).to.be.true;
      });

      it('Chama res.json com o obj "{ message: "Product not found", code: 404 }" ', async () => {
        await salesController.findById(request, response, next);

        expect(response.json.calledWith(findByIdProductResponseController)).to.be.true;
      });
    });
  });
});
