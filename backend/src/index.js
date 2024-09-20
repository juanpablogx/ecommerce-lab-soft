const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

app.use(cors());
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send('Ecommerce funcionando');
});

app.listen(3001, () => {
  console.log('Servidor rodando na porta 3001');
});

