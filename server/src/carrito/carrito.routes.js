const { Router } = require('express');

const router = Router();

const {
  createProductoCarritoController,
  findCarritoController,
  updateQuantityController,
  cancelCarritoController,
  removeProductoCarritoController
} = require('./carrito.controller');

/**
 * @swagger
 * /carrito:
 *   post:
 *     summary: Agrega un producto del inventario al carrito (crea el carrito si no existe)
 *     tags: 
 *       - Carrito
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_producto_inventario:
 *                 type: integer
 *                 description: Id del producto en el inventario
 *                 example: 2
 *               cantidad:
 *                 type: integer
 *                 description: Cantidad del producto en el carrito
 *                 example: 1
 *             required:
 *               - id_producto_inventario
 *               - cantidad
 *     responses:
 *       201:
 *         description: Producto en el inventario agregado al carrito exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 carrito:
 *                   type: object
 *                   properties:
 *                     id_carrito:
 *                       type: integer
 *                       example: 1
 *                     id_usuario:
 *                       type: integer
 *                       example: 1
 *                     estado_carrito:
 *                       type: string
 *                       example: "pendiente"
 *                     fecha_creacion_carrito:
 *                       type: string
 *                       example: "2024-01-01"
 *                 producto_carrito:
 *                   type: object
 *                   properties:
 *                     id_producto_carrito:
 *                       type: integer
 *                       example: 1
 *                     id_carrito:
 *                       type: integer
 *                       example: 1
 *                     id_producto_inventario:
 *                       type: integer
 *                       example: 1
 *                     cantidad:
 *                       type: integer
 *                       example: 2
 *                 isNewCarrito:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: Error al añadir un producto al carrito
 */
router.post('/', createProductoCarritoController);

/**
 * @swagger
 * /carrito:
 *   get:
 *     summary: Obtiene todos los productos en el carrito
 *     tags:
 *       - Carrito
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de productos en el carrito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_carrito:
 *                   type: integer
 *                   example: 1
 *                 id_usuario:
 *                   type: integer
 *                   example: 1
 *                 estado_carrito:
 *                   type: string
 *                   example: "pendiente"
 *                 fecha_creacion_carrito:
 *                   type: string
 *                   example: "2024-01-01"
 *                 productosCarrito:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id_producto_carrito:
 *                         type: integer
 *                         example: 1
 *                       id_carrito:
 *                         type: integer
 *                         example: 1
 *                       id_producto_inventario:
 *                         type: integer
 *                         example: 2
 *                       cantidad:
 *                         type: integer
 *                         example: 2
 *                       productoInventario:
 *                         type: object
 *                         properties:
 *                           id_producto_inventario:
 *                             type: integer
 *                             example: 2
 *                           id_producto:
 *                             type: integer
 *                             example: 1
 *                           talla_inventario:
 *                             type: string
 *                             example: "40"
 *                           stock_max:
 *                             type: integer
 *                             example: 100
 *                           stock_min:
 *                             type: integer
 *                             example: 0
 *                           stock:
 *                             type: integer
 *                             example: 10
 *                           producto:
 *                             type: object
 *                             properties:
 *                               id_producto:
 *                                 type: integer
 *                                 example: 1
 *                               nombre_producto:
 *                                 type: string
 *                                 example: "Producto 1"
 *                               descripcion_producto:
 *                                 type: string
 *                                 example: "Descripción del producto 1"
 *                               categoria:
 *                                 type: string
 *                                 example: "Categoria 1"
 *                               precio:
 *                                 type: number
 *                                 example: 150000.00
 *       400:
 *         description: Error al obtener todos los productos en el carrito
 */
router.get('/', findCarritoController);

/**
 * @swagger
 * /carrito/producto/{id}:
 *   put:
 *     summary: Actualiza la cantidad de un producto en el carrito
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Carrito
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer  
 *         required: true
 *         description: Id del producto carrito (id_producto_carrito)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cantidad:
 *                 type: integer
 *                 description: Cantidad del producto en el carrito
 *                 example: 1
 * 
 *     responses:
 *       200:
 *         description: Producto en el carrito actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_producto_carrito:
 *                   type: integer
 *                   example: 1
 *                 id_carrito:
 *                   type: integer
 *                   example: 1
 *                 id_producto_inventario:
 *                   type: integer
 *                   example: 2
 *                 cantidad:
 *                   type: integer
 *                   example: 2
 *       400:
 *         description: Error al actualizar un producto en el carrito
 *       404:
 *         description: Producto no encontrado en el carrito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Producto del carrito con id 2 no encontrado"
 */
router.put('/producto/:id', updateQuantityController);

/**
 * @swagger
 * /carrito/{id}:
 *   delete:
 *     summary: Cancela el carrito, eliminando todos los productos del carrito
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Carrito
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer  
 *         required: true
 *         description: Id del carrito
 *     responses:
 *       200:
 *         description: Carrito cancelado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Carrito con id 2 cancelado"
 *       404:
 *         description: Producto no encontrado en el carrito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Carrito con id 2 no encontrado"
 *       400:
 *         description: Error al cancelar un carrito
 */
router.delete('/:id', cancelCarritoController);

/**
 * @swagger
 * /carrito/producto/{id}:
 *   delete:
 *     summary: Elimina un producto en el carrito
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Carrito
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer  
 *         required: true
 *         description: Id del producto en el carrito (id_producto_carrito)
 *     responses:
 *       200:
 *         description: Producto eliminado exitosamente del carrito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Producto con id 2 eliminado exitosamente del carrito"
 *       404:
 *         description: Producto no encontrado en el carrito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Producto con id 2 no encontrado en el carrito"
 *       400:
 *         description: Error al eliminar un producto en el carrito
 */
router.delete('/producto/:id', removeProductoCarritoController);

module.exports = router;