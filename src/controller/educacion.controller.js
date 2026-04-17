
const EducacionSchema = require("../model/educacion.js")

const addEducacion = (req, res) => {
  try {
    const { place, career, start, finish, city, country } = req.body;

    let placeUser = place.trim();
    let careerUser = career.trim();
    let startUser = start;
    let finishUser = finish;
    let cityUser = city.trim();
    let countryUser = country.trim();

    if (!placeUser || !careerUser || !startUser || !finishUser || !cityUser || !countryUser) {
      return res.status(400).json({
        ok: false,
        msg: "Todos los campos son obligatorios",
      });
    }

    if(typeof placeUser !== "string" || typeof careerUser !== "string" || typeof startUser !== "number" || typeof finishUser !== "number" || typeof cityUser !== "string" || typeof countryUser !== "string") {
      return res.status(400).json({
        ok: false,
        msg: "Error en el tipo de dato de los campos",
      });
    }

    if(startUser > finishUser) {
      return res.status(400).json({
        ok: false,
        msg: "El año de inicio no puede ser mayor al año de finalización",
      });
    }

    if(startUser < 0 || finishUser < 0) {
      return res.status(400).json({
        ok: false,
        msg: "El año de inicio y el año de finalización no pueden ser negativos",
      });
    }

    const newEducacion = new EducacionSchema({
      place: placeUser,
      career: careerUser,
      start: startUser,
      finish: finishUser,
      city: cityUser,
      country: countryUser
    });

    newEducacion.save();

    res.status(201).json({
      ok: true,
      msg: "Educación agregada exitosamente",
    });

  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: `Error inesperado: ${error.message}`,
    });
  }
}

const getEducacion = async (req, res) => {
  try {
    const educacion = await EducacionSchema.find().select("-createdAt -updatedAt -__v").sort({ start: -1 });

    if(!educacion || educacion.length === 0) {
      return res.status(404).json({
        ok: false,
        msg: "No se encontraron datos de educación",
      });
    }

    res.status(200).json({
      ok: true,
      educacion
    })

  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: `Error inesperado: ${error.message}`,
    });
  }
}


module.exports = {
  addEducacion, getEducacion
}