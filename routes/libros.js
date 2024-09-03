const express = require('express')
const router = express.Router()

const libroController = require('../controllers/libroController')

//Mostrar todos los libros (GET)
router.get('/', libroController.mostrar);
//Crear libro (POST)
router.post('/crear', libroController.crear);
//Editar libro (POST)
router.post('/editar', libroController.editar);
//Eliminar libro (GET)
router.get('/eliminar/:id', libroController.eliminar);
module.exports = router