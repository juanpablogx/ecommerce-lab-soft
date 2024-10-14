const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const swaggerJsDoc = require('./config/swaggerConfig');
const swaggerUi = require('swagger-ui-express');

const { port } = require('./config/config');

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsDoc));

app.use('/productos', require('./productos/productos.routes'));
app.use('/usuarios', require('./usuarios/usuarios.routes'));

app.get('/', (req, res) => {
  res.send('Ecommerce funcionando');
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

