const {addEducacion, getEducacion} = require('../controller/educacion.controller');

const express = require('express')
const router = express()

router.post("/educacion", addEducacion)
router.get("/educacion", getEducacion)

module.exports = router;
