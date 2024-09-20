const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const { port } = require('./config');

const app = express();

app.use(cors());
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send('Ecommerce funcionando');
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

