require('dotenv').config();
const rescue = require('express-rescue');
const bodyParser = require('body-parser');
const express = require('express');
const productsController = require('./controllers/productsController');
const salesController = require('./controllers/salesController');
const errorMiddle = require('./middlewares/error');
const validateProducts = require('./middlewares/validateProducts');
const validateSales = require('./middlewares/validateSales');

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', rescue(productsController.getAll));
app.post('/products', rescue(validateProducts), rescue(productsController.create));
app.get('/products/:id', rescue(productsController.findById));
app.put('/products/:id', rescue(validateProducts), rescue(productsController.update));
app.delete('/products/:id', rescue(productsController.deleteProduct));

app.get('/sales', rescue(salesController.getAll));
app.post('/sales', rescue(validateSales.validadeSalesMiddle), rescue(salesController.create));
app.get('/sales/:id', rescue(salesController.findById));
app.put('/sales/:id', rescue(validateSales.validadeSalesMiddle));

app.use(errorMiddle);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
