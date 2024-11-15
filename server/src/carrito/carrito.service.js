const { Op, DatabaseError, QueryError } = require('sequelize');
const { Carrito, ProductoCarrito } = require('./carrito.model');
const ProductoInventario = require('../productos-inventario/productos-inventario.model');
const Producto = require('../productos/productos.model');

const addproductoCarrito = async (idUsuario, idProductoInventario, quantity) => {
  let isNewCarrito = false;
  let carrito = await Carrito.findOne({
    where: {
      id_usuario: idUsuario,
      estado_carrito: 'pendiente'
    },
  });

  if (!carrito) {
    carrito = await Carrito.create({
      id_usuario: idUsuario,
      estado_carrito: 'pendiente'
    });

    isNewCarrito = true;
  }

  let existProductoCarrito = await ProductoCarrito.findOne({
    where: {
      id_producto_inventario: idProductoInventario,
      id_carrito: carrito.id_carrito,
    },
  });

  if (existProductoCarrito) {
    throw new DatabaseError('Producto del carrito ya existe');
  }

  const productoCarrito = await ProductoCarrito.create({
    id_carrito: carrito.id_carrito,
    id_producto_inventario: idProductoInventario,
    cantidad: quantity,
  });

  return { carrito, producto_carrito: productoCarrito, isNewCarrito };
};

const findActiveCarrito = async (idUsuario) => {
  const allCarrito = await Carrito.findOne({
    where: {
      id_usuario: idUsuario,
      estado_carrito: 'pendiente'
    },
    include: [
      {
        model: ProductoCarrito, 
        as: 'productosCarrito', 
        include: [
          {
            model: ProductoInventario, 
            as: 'productoInventario',
            include: [
              {
                model: Producto,
                as: 'producto'
              }
            ]
          }
        ]
      },
    ],
  });

  return allCarrito;
};

const updateQuantityProductoCarrito = async (id, quantity) => {
  return await ProductoCarrito.update({ cantidad: quantity }, {
    where: {
      id_producto_carrito: id,
    },
    returning: true,
  });
};

const cancelCarrito = async (id) => {
  return await Carrito.destroy({
    where: {
      id_carrito: id,
      estado_carrito: 'pendiente'
    },
  });
};

const removeProductoCarrito = async (id) => {
  return await ProductoCarrito.destroy({
    where: {
      id_producto_carrito: id,
    },
  });
};

const findCarritoById = async (id) => {
  return await Carrito.findOne({
    where: {
      id_carrito: id,
    },
    include: [
      {
        model: ProductoCarrito,
        as: 'productosCarrito',
        include: [
          {
            model: ProductoInventario,
            as: 'productoInventario',
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
  });
};

module.exports = {
  addproductoCarrito,
  findActiveCarrito,
  updateQuantityProductoCarrito,
  cancelCarrito,
  removeProductoCarrito,
  findCarritoById
};