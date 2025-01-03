const { Router } = require('express');

const router = Router();

const {
  createController,
  findAllController,
  findByIdController,
  updateController,
  removeController,
  loginController,
  registerController
} = require('./usuarios.controller');

router.post('/', createController);
/**
 * @swagger
 * /usuarios:
 *   post:
 *     summary: Crear un nuevo usuario
 *     description: Crea un usuario nuevo y lo almacena en la base de datos.
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre_usuario:
 *                 type: string
 *               apellido_usuario:
 *                 type: string
 *               correo_usuario:
 *                 type: string
 *               telefono_usuario:
 *                 type: string
 *               direccion_usuario:
 *                 type: string
 *               password_usuario:
 *                 type: string
 *               rol_usuario:
 *                 type: string
 *             example:
 *               nombre_usuario: Juan
 *               apellido_usuario: Perez
 *               correo_usuario: juan@example.com
 *               telefono_usuario: "123456789"
 *               direccion_usuario: Calle 123
 *               password_usuario: password123
 *               rol_usuario: admin
 *     responses:
 *       201:
 *         description: Usuario creado con éxito
 *       400:
 *         description: Error en los datos enviados
 */

router.get('/', findAllController);
/**
 * @swagger
 * /usuarios:
 *   get:
 *     summary: Obtener todos los usuarios
 *     description: Obtiene una lista de todos los usuarios almacenados.
 *     tags: [Usuarios]
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida con éxito
 *       400:
 *         description: Error al obtener los usuarios
 */

router.get('/:id', findByIdController);
/**
 * @swagger
 * /usuarios/{id}:
 *   get:
 *     summary: Obtener un usuario por ID
 *     description: Devuelve un usuario basado en el ID proporcionado.
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario encontrado con éxito
 *       404:
 *         description: Usuario no encontrado
 *       400:
 *         description: Error al buscar el usuario
 */

router.put('/:id', updateController);
/**
 * @swagger
 * /usuarios/{id}:
 *   put:
 *     summary: Actualizar un usuario por ID
 *     description: Actualiza la información de un usuario existente.
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre_usuario:
 *                 type: string
 *               apellido_usuario:
 *                 type: string
 *               correo_usuario:
 *                 type: string
 *               telefono_usuario:
 *                 type: string
 *               direccion_usuario:
 *                 type: string
 *               password_usuario:
 *                 type: string
 *               rol_usuario:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuario actualizado con éxito
 *       400:
 *         description: Error al actualizar el usuario
 */

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
/**
 * @swagger
 * /usuarios/register:
 *   post:
 *     summary: Crea un nuevo usuario.
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre_usuario:
 *                 type: string
 *                 description: Nombre del usuario.
 *                 example: Juan
 *               apellido_usuario:
 *                 type: string
 *                 description: Apellido del usuario.
 *                 example: Pérez
 *               correo_usuario:
 *                 type: string
 *                 description: Correo electrónico del usuario.
 *                 example: juan.perez@example.com
 *               telefono_usuario:
 *                 type: string
 *                 description: Número de teléfono del usuario.
 *                 example: +573001234567
 *               direccion_usuario:
 *                 type: string
 *                 description: Dirección física del usuario.
 *                 example: Calle 123 #45-67, Bogotá
 *               password_usuario:
 *                 type: string
 *                 description: Contraseña del usuario (será encriptada).
 *                 example: Password123!
 *               rol_usuario:
 *                 type: string
 *                 description: Rol del usuario en la plataforma.
 *                 example: cliente
 *                 default: cliente
 *     responses:
 *       201:
 *         description: Usuario creado.
 *       400:
 *         description: Error en la solicitud.
 */
router.post('/register', registerController);
/**
 * @swagger
 * /register:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     description: Registra un nuevo usuario y devuelve un token de acceso.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre_usuario:
 *                 type: string
 *               apellido_usuario:
 *                 type: string
 *               correo_usuario:
 *                 type: string
 *               telefono_usuario:
 *                 type: string
 *               direccion_usuario:
 *                 type: string
 *               password_usuario:
 *                 type: string
 *               rol_usuario:
 *                 type: string
 *             example:
 *               nombre_usuario: Juan
 *               apellido_usuario: Perez
 *               correo_usuario: juan@example.com
 *               telefono_usuario: "123456789"
 *               direccion_usuario: Calle 123
 *               password_usuario: password123
 *               rol_usuario: admin
 *     responses:
 *       201:
 *         description: Usuario registrado con éxito
 *       400:
 *         description: El usuario ya existe o faltan datos requeridos
 *       500:
 *         description: Error en el servidor
 */


module.exports = router;
