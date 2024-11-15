const { Router } = require('express');

const router = Router();

const {
  createOrdenController,
  findOrdenController,
  payOrdenController,
  cancelOrdenController,
  findOrdenByIdCarritoController
} = require('./ordenes.controller');

/**
 * @swagger
 * /ordenes:
 *   post:
 *     summary: Crea una orden de compra
 *     tags: 
 *       - Ordenes
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_carrito:
 *                 type: integer
 *                 description: Id del carrito
 *                 example: 1
 *               direccion_entrega:
 *                 type: string
 *                 description: Direccion de entrega del carrito
 *                 example: "Calle 123"
 *             required: 
 *               - id_carrito
 *               - precio
 *               - direccion_entrega
 *     responses:
 *       201:
 *         description: Orden creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_orden:
 *                   type: integer
 *                   example: 1
 *                 id_carrito:
 *                   type: integer
 *                   example: 1
 *                 fecha_orden:
 *                   type: string
 *                   example: "2024-01-01"
 *                 precio_orden:
 *                   type: number
 *                   example: 100
 *                 direccion_entrega:
 *                   type: string
 *                   example: "Calle 123"
 *                 estado_orden:
 *                   type: string
 *                   example: "pendiente"
 *       400:
 *         description: Error al crear una orden
 */
router.post('/', createOrdenController);

/**
 * @swagger
 * /ordenes/{id}:
 *   get:
 *     summary: Obtiene una orden por id
 *     tags:
 *       - Ordenes
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer  
 *         required: true
 *         description: Id de la orden
 *     responses:
 *       200:
 *         description: Orden obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_orden:
 *                     type: integer
 *                     example: 1
 *                   id_carrito:
 *                     type: integer
 *                     example: 1
 *                   estado_orden:
 *                     type: string
 *                     example: "pendiente"
 *                   fecha_orden:
 *                     type: string
 *                     example: "2024-01-01"
 *                   precio_orden:
 *                     type: number
 *                     example: 100.00
 *                   direccion_entrega:
 *                     type: string
 *                     example: "Calle 123"
 *                   carrito:
 *                     type: object
 *                     properties:
 *                       id_carrito:
 *                         type: integer
 *                         example: 1
 *                       estado_carrito:
 *                         type: string
 *                         example: "pendiente"
 *                       fecha_creacion_carrito:
 *                         type: string
 *                         example: "2022-01-01"
 *                       productosCarrito:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             cantidad:
 *                               type: integer
 *                               example: 1
 *                             productoInventario:
 *                               type: object
 *                               properties:
 *                                 talla_inventario:
 *                                   type: string
 *                                   example: "40"
 *                                 producto:
 *                                   type: object
 *                                   properties:
 *                                     nombre_producto:
 *                                       type: string
 *                                       example: "Producto 1"
 *                                     precio:
 *                                       type: number
 *                                       example: 100.00
 *                                     categoria:
 *                                       type: string
 *                                       example: "hombre"
 *       400:
 *         description: Error al obtener la orden
 */
router.get('/:id', findOrdenController);

/**
 * @swagger
 * /ordenes/{id}/pagar:
 *   put:
 *     summary: Paga la orden
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Ordenes
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer  
 *         required: true
 *         description: Id de la orden
 *     requestBody:
 *       required: false
 *     responses:
 *       200:
 *         description: Orden pagada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_orden:
 *                   type: integer
 *                   description: Id de la orden
 *                   example: 1
 *                 id_carrito:
 *                   type: integer
 *                   example: 1
 *                 direccion_entrega:
 *                   type: string
 *                   example: "Calle 123"
 *                 precio_orden:
 *                   type: number
 *                   example: 100.00
 *                 fecha_orden:
 *                   type: string
 *                   example: "2024-01-01"
 *                 estado_orden:
 *                   type: string
 *                   example: "pagado"
 *       400:
 *         description: Error al pagar la orden
 */
router.put('/:id/pagar', payOrdenController);

/**
 * @swagger
 * /ordenes/{id}:
 *   delete:
 *     summary: Cancela la orden
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Ordenes
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer  
 *         required: true
 *         description: Id de la orden
 *     responses:
 *       200:
 *         description: Orden cancelada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Orden con id 2 cancelada"
 *       404:
 *         description: Producto no encontrado en el carrito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Orden con id 2 no encontrada"
 *       400:
 *         description: Error al cancelar la orden
 */
router.delete('/:id', cancelOrdenController);

module.exports = router;