const { Router } = require('express'); 

const router = Router();

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


const {
  addImageController,
} = require('./img_productos.controller');

/**
 * @swagger
 * /img_productos:
 *   post:
 *     summary: Subir una imagen para un producto
 *     tags: 
 *       - Imagenes Productos
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del producto al que se va a subir la imagen
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: file
 *                 description: Imagen a subir
 *     responses:
 *       201:
 *         description: Imagen subida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_imagen_producto:
 *                   type: integer
 *                   example: 1
 *                 id_producto:
 *                   type: integer
 *                   example: 1
 *                 url:
 *                   type: string
 *                   example: https://res.cloudinary.com/ds1gp94gs/image/upload/v1729888048/productos/uzznqom3jxhitnktsyla.webp
 *       400:
 *         description: Error al subir la imagen
 */
router.post('/:id', upload.single('image'), addImageController);



module.exports = router;