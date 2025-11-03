
const { crearCurso } = require('../controller/curso_controller.js');
const upload = require('../config/multer.js')
const express = require('express')

const router = express()

router.post("/crear-curso", upload.single('imagen'), crearCurso);

module.exports = router