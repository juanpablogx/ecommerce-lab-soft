const { Router } = require('express');

const router = Router();

const {
  createController,
  findAllController,
  findByIdController,
  findByCategoryController,
  updateController,
  removeController
} = require('./productos.controller');

/**
 * @swagger
 * /productos:
 *   post:
 *     summary: Crea un nuevo producto
 *     tags: 
 *       - Productos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre_producto:
 *                 type: string
 *                 description: Nombre del producto
 *                 example: "Nike Air"
 *               descripcion_producto:
 *                 type: string
 *                 description: Descripción del producto
 *                 example: "Nike Air excelentes zapatillas"
 *               categoria:
 *                 type: string
 *                 description: Categoría del producto
 *                 example: "hombre"
 *               precio:
 *                 type: number
 *                 description: Precio del producto
 *                 example: 375000.00
 *     responses:
 *       201:
 *         description: Producto creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_producto:
 *                   type: integer
 *                   example: 1
 *                 nombre_producto:
 *                   type: string
 *                   example: "Nike Air"
 *                 descripcion_producto:
 *                   type: string
 *                   example: "Nike Air excelentes zapatillas"
 *                 categoria:
 *                   type: string
 *                   example: "hombre"
 *                 precio:
 *                   type: number
 *                   example: 375000.00
 *       400:
 *         description: Error al crear el producto
 */
router.post('/', createController);

/**
 * @swagger
 * /productos:
 *   get:
 *     summary: Obtener todos los productos
 *     description: Recupera una lista de todos los productos almacenados en la base de datos.
 *     tags: [Productos]
 *     responses:
 *       200:
 *         description: Lista de productos obtenida con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_producto:
 *                     type: integer
 *                   nombre_producto:
 *                     type: string
 *                   descripcion_producto:
 *                     type: string
 *                   categoria:
 *                     type: string
 *                   precio:
 *                     type: number
 *       400:
 *         description: Error al obtener los productos
 */
router.get('/', findAllController);

/**
 * @swagger
 * /productos/{id}:
 *   get:
 *     summary: Obtener un producto por ID
 *     description: Devuelve la información de un producto específico basado en su ID.
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del producto a buscar
 *     responses:
 *       200:
 *         description: Producto encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_producto:
 *                   type: integer
 *                   example: 1
 *                 nombre_producto:
 *                   type: string
 *                   example: "Nike Air"
 *                 descripcion_producto: 
 *                   type: string
 *                   example: "Nike Air excelentes zapatillas"
 *                 categoria: 
 *                   type: string
 *                   example: "mujer"
 *                 precio: 
 *                   type: number
 *                   example: 375000.00
 *                 productoInventario:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id_producto_inventario:
 *                         type: integer
 *                         example: 1
 *                       id_producto:
 *                         type: integer
 *                         example: 1
 *                       talla_inventario:
 *                         type: string
 *                         example: "40"
 *                       stock_max:
 *                         type: integer
 *                         example: 100
 *                       stock_min:
 *                         type: integer
 *                         example: 0
 *                       stock:
 *                         type: integer
 *                         example: 10
 *                 imagenes: 
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id_imagen_producto:
 *                         type: integer
 *                         example: 1
 *                       id_producto:
 *                         type: integer
 *                         example: 1
 *                       url:
 *                         type: string
 *                         example: https://res.cloudinary.com/ds1gp94gs/image/upload/v1729888048/productos/uzznqom3jxhitnktsyla.webp
 * 
 *       404:
 *         description: Producto no encontrado con el ID proporcionado
 *       400:
 *         description: Error al buscar el producto
 */
router.get('/:id', findByIdController);



router.get('/categoria/:category', findByCategoryController);

router.put('/:id', updateController);
/**
 * @swagger
 * /productos/{id}:
 *   put:
 *     summary: Actualizar un producto por ID
 *     description: Actualiza la información de un producto existente utilizando su ID.
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del producto a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre_producto:
 *                 type: string
 *               descripcion_producto:
 *                 type: string
 *               categoria:
 *                 type: string
 *             example:
 *               nombre_producto: Zapatos de Vestir
 *               descripcion_producto: Zapatos formales de cuero
 *               categoria: Formal
 *     responses:
 *       200:
 *         description: Producto actualizado con éxito
 *       400:
 *         description: Error al actualizar el producto. Datos inválidos o faltantes.
 */

router.delete('/:id', removeController);
/**
 * @swagger
 * /productos/{id}:
 *   delete:
 *     summary: Eliminar un producto por ID
 *     description: Elimina un producto registrado en la base de datos utilizando su ID.
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del producto a eliminar
 *     responses:
 *       200:
 *         description: Producto eliminado con éxito
 *       404:
 *         description: Producto no encontrado con el ID proporcionado
 *       400:
 *         description: Error al intentar eliminar el producto
 */


module.exports = router;
