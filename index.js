require('dotenv').config();
const rescue = require('express-rescue');
const bodyParser = require('body-parser');
const express = require('express');
const productsController = require('./controllers/productsController');
const salesController = require('./controllers/salesController');
const errorMiddle = require('./middlewares/error');

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', rescue(productsController.getAll));
app.get('/products/:id', rescue(productsController.findById));

app.get('/sales', rescue(salesController.getAll));
app.get('/sales/:id', rescue(salesController.findById));

app.use(errorMiddle);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
