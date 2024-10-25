const services = require('./img_productos.service');
const cloudinary = require('../config/cloudinary');
const fs = require('fs');
const multer = require('multer');


// Configura multer para almacenar archivos en memoria
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });



const addImageController = async (req, res) => {
  try{
    const productId = req.params.id;
    const imageFile = req.file;

    // Check if image file is provided
    if (!imageFile){
      return res.status(400).json({ message: 'No image file provided'});
    }

    // // Define the uploads directory and ensure it exists
    // const uploadsDir = path.join(__dirname, './uploads');
    // if (!fs.existsSync(uploadsDir)) {
    //   fs.mkdirSync(uploadsDir);
    // }

    // Save the image file to a temporary file
    const tempFilePath = `./uploads/${imageFile.originalname}`;
    fs.writeFileSync(tempFilePath, imageFile.buffer);

    // Upload the image file to Cloudinary
    const result = await cloudinary.uploader.upload(tempFilePath, {
      folder: 'productos',
    });

    // Delete the temporary file
    fs.unlinkSync(tempFilePath);

    console.log('Result:', result.secure_url);

    // Get the URL of the uploaded image
    const imageURL = result.secure_url;

    // Create a new product image
    await services.create({
      id_producto: productId,
      url: imageURL,
    });
    res.status(201).json({ message: 'Imagen de producto creada'});
  } catch (error){
    console.log('Error creando imagen de producto:', error);
    res.status(500).json({ message: 'Error creando imagen de producto'});
    res.end();
  }
}

const getImageController = async (req, res) => {
  try{
    const productId = req.params.id;
    const image = await services.findByProductId(productId);
    res.status(200).json(image);
  } catch (error){
    console.log('Error obteniendo imagen de producto:', error);
    res.status(500).json({ message: 'Error obteniendo imagen de producto'});
    res.end();
  }
}

module.exports = {
  addImageController,
}





