
const app = require('express')
const {sendMsg} = require('../controller/email.controller.js');
const routes = app()

routes.post('/enviar-email', sendMsg)
module.exports = routes