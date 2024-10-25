const { Router } = require('express');

const router = Router();

const {
  createController,
  findAllController,
  findByIdController,
  updateController,
  removeController,
  findByCategoryController,
  findByNameProductController
} = require('./productos-inventario.controller');

/**
 * @swagger
 * /productos-inventario:
 *   post:
 *     summary: Crea un nuevo producto en el inventario (Asigna un producto)
 *     tags: 
 *       - Producto Inventario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_producto:
 *                 type: integer
 *                 description: Id del producto
 *                 example: 1
 *               talla_inventario:
 *                 type: string
 *                 description: Talla del producto en el inventario
 *                 example: "40"
 *               stock_max:
 *                 type: integer
 *                 description: Stock máximo del producto
 *                 example: 100
 *               stock_min:
 *                 type: integer
 *                 description: Stock mínimo del producto
 *                 example: 0
 *               stock:
 *                 type: integer
 *                 description: Stock actual del producto
 *                 example: 10
 *             required:
 *               - id_producto
 *               - talla_inventario
 *               - stock
 *     responses:
 *       201:
 *         description: Producto en el inventario creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_producto_inventario:
 *                   type: integer
 *                   example: 2
 *                 id_producto:
 *                   type: integer
 *                   example: 1
 *                 talla_inventario:
 *                   type: string
 *                   example: "40"
 *                 stock_max:
 *                   type: integer
 *                   example: 100
 *                 stock_min:
 *                   type: integer
 *                   example: 0
 *                 stock:
 *                   type: integer
 *                   example: 10
 *       400:
 *         description: Error al crear el productoInventario
 */
router.post('/', createController);

/**
 * @swagger
 * /productos-inventario:
 *   get:
 *     summary: Obtiene todos los productos en el inventario
 *   tags:
 *     - Producto Inventario
 *   responses:
 *     200:
 *       description: Lista de productos en el inventario
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 id_producto_inventario:
 *                   type: integer
 *                   example: 2
 *                 id_producto:
 *                   type: integer
 *                   example: 1
 *                 talla_inventario:
 *                   type: string
 *                   example: "40"
 *                 stock_max:
 *                   type: integer
 *                   example: 100
 *                 stock_min:
 *                   type: integer
 *                   example: 0
 *                 stock:
 *                   type: integer
 *                   example: 10
 *                 producto:
 *                   type: object
 *                   properties:
 *                     id_producto:
 *                       type: integer
 *                       example: 1
 *                     nombre_producto:
 *                       type: string
 *                       example: "Producto 1"
 *                     descripcion_producto:
 *                       type: string
 *                       example: "Descripción del producto 1"
 *                     categoria:
 *                       type: string
 *                       example: "Categoria 1"
 *                     precio:
 *                       type: number
 *                       example: 150000.00
 *       400:
 *         description: Error al obtener todos los productos en el inventario
 */
router.get('/', findAllController);

/**
 * @swagger
 * /productos-inventario/{id}:
 *   get:
 *     summary: Obtiene un producto en el inventario
 *     tags:
 *       - Producto Inventario
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer  
 *         required: true
 *         description: Id del producto en el inventario
 *     responses:
 *       200:
 *         description: Producto en el inventario
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_producto_inventario:
 *                   type: integer
 *                   example: 2
 *                 id_producto:
 *                   type: integer
 *                   example: 1
 *                 talla_inventario:
 *                   type: string
 *                   example: "40"
 *                 stock_max:
 *                   type: integer
 *                   example: 100
 *                 stock_min:
 *                   type: integer
 *                   example: 0
 *                 stock:
 *                   type: integer
 *                   example: 10
 *                 producto:
 *                   type: object
 *                   properties:
 *                     id_producto:
 *                       type: integer
 *                       example: 1
 *                     nombre_producto:
 *                       type: string
 *                       example: "Producto 1"
 *                     descripcion_producto:
 *                       type: string
 *                       example: "Descripción del producto 1"
 *                     categoria:
 *                       type: string
 *                       example: "Categoria 1"
 *                     precio:
 *                       type: number
 *                       example: 150000.00
 *       400:
 *         description: Error al obtener un producto en el inventario
 */
router.get('/:id', findByIdController);

/**
 * @swagger
 * /productos-inventario/{id}:
 *   put:
 *     summary: Actualiza un producto en el inventario
 *     tags:
 *       - Producto Inventario
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer  
 *         required: true
 *         description: Id del producto en el inventario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_producto:
 *                 type: integer
 *                 description: Id del producto
 *                 example: 1
 *               talla_inventario:
 *                 type: string
 *                 description: Talla del producto en el inventario
 *                 example: "40"
 *               stock_max:
 *                 type: integer
 *                 description: Stock máximo del producto
 *                 example: 100
 *               stock_min:
 *                 type: integer
 *                 description: Stock mínimo del producto
 *                 example: 0
 *               stock:
 *                 type: integer
 *                 description: Stock actual del producto
 *                 example: 10
 *               precio:
 *                 type: number
 *                 description: Precio del producto
 *                 example: 150000.00
 * 
 *     responses:
 *       200:
 *         description: Producto en el inventario actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_producto_inventario:
 *                   type: integer
 *                   example: 2
 *                 id_producto:
 *                   type: integer
 *                   example: 1
 *                 talla_inventario:
 *                   type: string
 *                   example: "40"
 *                 stock_max:
 *                   type: integer
 *                   example: 100
 *                 stock_min:
 *                   type: integer
 *                   example: 0
 *                 stock:
 *                   type: integer
 *                   example: 10
 *                 producto:
 *                   type: object
 *                   properties:
 *                     id_producto:
 *                       type: integer
 *                       example: 1
 *                     nombre_producto:
 *                       type: string
 *                       example: "Producto 1"
 *                     descripcion_producto:
 *                       type: string
 *                       example: "Descripción del producto 1"
 *                     categoria:
 *                       type: string
 *                       example: "Categoria 1"
 *                     precio:
 *                       type: number
 *                       example: 150000.00
 *       400:
 *         description: Error al actualizar un producto en el inventario
 */
router.put('/:id', updateController);

/**
 * @swagger
 * /productos-inventario/{id}:
 *   delete:
 *     summary: Elimina un producto en el inventario
 *     tags:
 *       - Producto Inventario
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer  
 *         required: true
 *         description: Id del producto en el inventario
 *     responses:
 *       200:
 *         description: Producto eliminado exitosamente del inventario
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Producto con id 2 eliminado del inventario"
 *       404:
 *         description: Producto no encontrado en el inventario
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Producto con id 2 no encontrado en el inventario"
 *       400:
 *         description: Error al eliminar un producto en el inventario
 */
router.delete('/:id', removeController);

/**
 * @swagger
 * /productos-inventario/categoria/{categoria}:
 *   get:
 *     summary: Obtiene todos los productos en el inventario de una categoria
 *     tags:
 *       - Producto Inventario
 *     parameters:
 *       - in: path
 *         name: categoria
 *         schema:
 *           type: string  
 *         required: true
 *         description: Categoria del producto en el inventario
 *     responses:
 *       200:
 *         description: Lista de productos en el inventario de la categoria
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_producto_inventario:
 *                     type: integer
 *                     example: 2
 *                   id_producto:
 *                     type: integer
 *                     example: 1
 *                   talla_inventario:
 *                     type: string
 *                     example: "40"
 *                   stock_max:
 *                     type: integer
 *                     example: 100
 *                   stock_min:
 *                     type: integer
 *                     example: 0
 *                   stock:
 *                     type: integer
 *                     example: 10
 *                   producto:
 *                     type: object
 *                     properties:
 *                       id_producto:
 *                         type: integer
 *                         example: 1
 *                       nombre_producto:
 *                         type: string
 *                         example: "Producto 1"
 *                       descripcion_producto:
 *                         type: string
 *                         example: "Descripción del producto 1"
 *                       categoria:
 *                         type: string
 *                         example: "Categoria 1"
 *                       precio:
 *                         type: number
 *                         example: 150000.00
 *       400:
 *         description: Error al obtener todos los productos en el inventario de una categoria
 */
router.get('/categoria/:categoria', findByCategoryController);

/**
 * @swagger
 * /productos-inventario/nombre-producto/{nombre_producto}:
 *   get:
 *     summary: Obtiene todos los productos en el inventario con un nombre de producto
 *     tags:
 *       - Producto Inventario
 *     parameters:
 *       - in: path
 *         name: nombre_producto
 *         schema:
 *           type: string  
 *         required: true
 *         description: Nombre del producto en el inventario
 *     responses:
 *       200:
 *         description: Lista de productos en el inventario con el nombre de producto
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_producto_inventario:
 *                     type: integer
 *                     example: 2
 *                   id_producto:
 *                     type: integer
 *                     example: 1
 *                   talla_inventario:
 *                     type: string
 *                     example: "40"
 *                   stock_max:
 *                     type: integer
 *                     example: 100
 *                   stock_min:
 *                     type: integer
 *                     example: 0
 *                   stock:
 *                     type: integer
 *                     example: 10
 *                   producto:
 *                     type: object
 *                     properties:
 *                       id_producto:
 *                         type: integer
 *                         example: 1
 *                       nombre_producto:
 *                         type: string
 *                         example: "Producto 1"
 *                       descripcion_producto:
 *                         type: string
 *                         example: "Descripción del producto 1"
 *                       categoria:
 *                         type: string
 *                         example: "Categoria 1"
 *                       precio:
 *                         type: number
 *                         example: 150000.00
 *       400:
 *         description: Error al obtener todos los productos en el inventario con un nombre de producto
 */
router.get('/nombre-producto/:nombre_producto', findByNameProductController);

module.exports = router;