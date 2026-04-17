const express = require("express");
const {
  addExperiencia,
  getExperiencia,
} = require("../controller/experiencia.controller.js");

const routes = express.Router();

routes.post("/experiencia", addExperiencia);
routes.get("/experiencia", getExperiencia);

module.exports = routes;