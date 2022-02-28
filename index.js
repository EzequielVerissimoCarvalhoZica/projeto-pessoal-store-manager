require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const salesRouter = require('./middlewares/salesRouter');
const productsRouter = require('./middlewares/productsRouter');
const errorMiddle = require('./middlewares/error');

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/sales', salesRouter);

app.use('/products', productsRouter);

app.use(errorMiddle);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
