const { Router } = require('express');

const router = Router();

const {
  createController,
  findAllController,
  findByIdController,
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
 *                 example: "Café especial"
 *               descripcion_producto:
 *                 type: string
 *                 description: Descripción del producto
 *                 example: "Café de alta calidad producido en la región cafetera"
 *               categoria:
 *                 type: string
 *                 description: Categoría del producto
 *                 example: "Bebidas"
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
 *                   example: "Café especial"
 *                 descripcion_producto:
 *                   type: string
 *                   example: "Café de alta calidad producido en la región cafetera"
 *                 categoria:
 *                   type: string
 *                   example: "Bebidas"
 *       400:
 *         description: Error al crear el producto
 */
router.post('/', createController);
router.get('/', findAllController);
router.get('/:id', findByIdController);
router.put('/:id', updateController);
router.delete('/:id', removeController);

module.exports = router;