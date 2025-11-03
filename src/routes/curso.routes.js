
const { crearCurso } = require('../controller/curso_controller.js');
const express = require('express')

const router = express()

router.post('/crear-curso', crearCurso)


module.exports = router