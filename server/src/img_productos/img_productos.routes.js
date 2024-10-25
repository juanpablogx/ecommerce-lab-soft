const { Router } = require('express'); 

const router = Router();

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


const {
  addImageController,
} = require('./img_productos.controller');

// Add a new product image
router.post('/:id', upload.single('image'), addImageController);



module.exports = router;