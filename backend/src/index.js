const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const { port } = require('./config');

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

app.use('/productos', require('./productos/productos.routes'));

app.get('/', (req, res) => {
  res.send('Ecommerce funcionando');
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

