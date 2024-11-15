const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const swaggerJsDoc = require('./config/swaggerConfig');
const swaggerUi = require('swagger-ui-express');
require('dotenv').config();
const { port } = require('./config/config');

const { authenticationUserMiddleware } = require('./middlewares/authUser');

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsDoc));

app.use('/productos', require('./productos/productos.routes'));
app.use('/usuarios', require('./usuarios/usuarios.routes'));
app.use('/img_productos', require('./img_productos/img_productos.routes'));
app.use('/productos-inventario', require('./productos-inventario/productos-inventario.routes'));
app.use('/carrito', authenticationUserMiddleware('client'), require('./carrito/carrito.routes'));
app.use('/ordenes', authenticationUserMiddleware('client'), require('./ordenes/ordenes.routes'));

app.get('/', (req, res) => {
  res.send('Ecommerce funcionando');
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(400).send(err);
});

const syncModels = require('./config/modelsConfig');

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

