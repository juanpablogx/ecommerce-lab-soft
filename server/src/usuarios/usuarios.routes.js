const { Router } = require('express');

const router = Router();

const {
  createController,
  findAllController,
  findByIdController,
  updateController,
  removeController,
  loginController
} = require('./usuarios.controller');

router.post('/', createController);
router.get('/', findAllController);
router.get('/:id', findByIdController);
router.put('/:id', updateController);
router.delete('/:id', removeController);

/**
 * @swagger
 * /usuarios/login:
 *   post:
 *     summary: Loguea un usuario
 *     tags: 
 *       - Usuarios
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               correo:
 *                 type: string
 *                 description: Correo electrónico del usuario
 *                 example: "fulano@mail.com"
 *               password:
 *                 type: string
 *                 description: Contraseña del usuario
 *                 example: "12345678"
 *     responses:
 *       200:
 *         description: Usuario logueado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: "a782f8ebddb379dbbd"
 *                 usuario:
 *                   type: object
 *                   properties:
 *                     id_usuario:
 *                       type: integer
 *                       example: 1
 *                     nombre_usuario:
 *                       type: string
 *                       example: "Fulano"
 *                     apellido_usuario:
 *                       type: string
 *                       example: "Fulano"
 *                     correo_usuario:
 *                       type: string
 *                       example: "fulano@mail.com"
 *                     telefono_usuario:
 *                       type: string
 *                       example: "12345678"
 *                     direccion_usuario:
 *                       type: string
 *                       example: "Calle 123"
 *                     password_usuario:
 *                       type: undefined
 *                     rol_usuario:
 *                       type: string
 *                       example: "admin"
 *       400:
 *         description: Error al loguear el usuario
 *       404:
 *         description: Usuario no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Usuario no encontrado"
 */
router.post('/login', loginController);

module.exports = router;
