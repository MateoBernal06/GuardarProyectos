
const express = require('express')
const {sendMsg} = require('../controller/email.controller.js');
const routes = express.Router()

routes.post('/enviar-email', sendMsg)
module.exports = routes