const { Router } = require('express');

const router = Router();

const {
  createController,
  findAllController,
  findByIdController,
  updateController,
  removeController
} = require('./usuarios.controller');

router.post('/', createController);
router.get('/', findAllController);
router.get('/:id', findByIdController);
router.put('/:id', updateController);
router.delete('/:id', removeController);

module.exports = router;
