const { Router } = require('express');
const { check } = require('express-validator');

//Controllers
const { getCursos, getCursoPorID, postCurso, putCurso, deleteCurso } = require('../controllers/curso');
const { existeCursoPorId } = require('../helpers/db-validators');

// Middlewares
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();

//Manejo de rutas

// Obtener todas las categorias - publico
router.get('/', getCursos );

// Obtener una categoria por id - publico
router.get('/:id', [
    check('id', 'No es un id de Mongo Válido').isMongoId(),
    check('id').custom( existeCursoPorId ),
    validarCampos
], getCursoPorID );

// Crear categoria - privada - cualquier persona con un token válido
router.post('/agregar', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
] ,postCurso);

// Actuaizar categoria - privada - cualquier persona con un token válido
router.put('/editar/:id', [
    validarJWT,
    check('id', 'No es un id de Mongo Válido').isMongoId(),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom( existeCursoPorId ),
    validarCampos
] ,putCurso);

//Borrar una categoria - privado - Solo el admin puede eliminar una categoria (estado: false)
router.delete('/eliminar/:id', [
    validarJWT,
    check('id', 'No es un id de Mongo Válido').isMongoId(),
    check('id').custom( existeCursoPorId ),
    validarCampos
] ,deleteCurso);



module.exports = router;