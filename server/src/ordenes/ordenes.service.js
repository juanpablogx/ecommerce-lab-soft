const sequelize = require('../database/connection');

const Orden = require('./ordenes.model');
const { DatabaseError } = require('sequelize');
const { Carrito, ProductoCarrito } = require('../carrito/carrito.model');
const serviceCarrito = require('../carrito/carrito.service');
const ProductoInventario = require('../productos-inventario/productos-inventario.model');
const Producto = require('../productos/productos.model');

const createOrden = async (orden) => {
  const { id_carrito } = orden;
  const carrito = await serviceCarrito.findCarritoById(id_carrito);

  if (!carrito) {
    throw new DatabaseError('Carrito no encontrado');
  }

  const sanitizedProductosCarrito = carrito.productosCarrito.map((productoCarrito) => {
    const { cantidad, productoInventario } = productoCarrito;
    return cantidad * productoInventario.producto.precio;
  });

  const total = sanitizedProductosCarrito.reduce((acum, val) => acum + val, 0);

  let dataNewOrden = { ...orden, precio_orden: total, estado_orden: 'pendiente' };
  dataNewOrden = orden?.precio_orden ? { ...dataNewOrden, precio_orden: orden.precio_orden } : dataNewOrden;

  const newOrden = await Orden.create(dataNewOrden);

  return newOrden;
};

const findOrden = async (idOrden) => {
  const orden = await Orden.findOne({
    where: {
      id_orden: idOrden
    },
    include: [
      {
        model: Carrito,
        as: 'carrito',
        attributes: ['estado_carrito', 'fecha_creacion_carrito'],
        include: [
          {
            model: ProductoCarrito,
            as: 'productosCarrito',
            attributes: ['cantidad'],
            include: [
              {
                model: ProductoInventario,
                as: 'productoInventario',
                attributes: ['talla_inventario'],
                include: [
                  {
                    model: Producto,
                    as: 'producto'
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  });

  let modifiedOrden = { ...orden.get({ plain: true }) };

  if (orden) {
    modifiedOrden.carrito.productosCarrito = modifiedOrden.carrito.productosCarrito.map((productoCarrito) => {
      const { nombre_pro, categoria, precio } = productoCarrito.productoInventario.producto;
      productoCarrito.productoInventario.producto = {
        nombre_producto: nombre_pro,
        categoria,
        precio
      }

      return productoCarrito;
    });
  }

  return modifiedOrden;

};

const findOrdenByIdCarrito = async (idCarrito) => {
  return await Orden.findOne({
    where: {
      id_carrito: idCarrito
    },
    include: [
      { model: Carrito, as: 'carrito' }
    ]
  });
};

const findAllOrdenesByUser = async (idUsuario) => {
  return await Orden.findAll({
    where: {
      id_usuario: idUsuario
    },
    include: [
      {
        model: Carrito,
        as: 'carrito',
        attributes: ['estado_carrito', 'fecha_creacion_carrito'],
        include: [
          {
            model: ProductoCarrito,
            as: 'productosCarrito',
            attributes: ['cantidad'],
            include: [
              {
                model: ProductoInventario,
                as: 'productoInventario',
                attributes: ['talla_inventario'],
                include: [
                  {
                    model: Producto,
                    as: 'producto',
                    attributes: ['nombre_producto', 'precio', 'categoria']
                  }
                  
                ]
              }
            ]
          }
        ]
      }
    ]
  });
};

const payOrden = async (idOrden) => {
  const [affectedCount, resultOrden] = await Orden.update({ estado_orden: 'pagado' }, {
    where: {
      id_orden: idOrden
    },
    returning: true,
  });

  if (affectedCount === 0) {
    throw new DatabaseError(`Orden con id ${idOrden} no encontrado`);
  }

  const updateCarrito = await Carrito.update({ estado_carrito: 'pagado' }, {
    where: {
      id_carrito: resultOrden[0].id_carrito
    },
    returning: true,
  });

  return resultOrden[0];
};

const cancelOrden = async (idOrden) => {
  return await Orden.destroy({
    where: {
      id_orden: idOrden
    },
  });
};

module.exports = {
  createOrden,
  findOrden,
  findOrdenByIdCarrito,
  payOrden,
  cancelOrden
};