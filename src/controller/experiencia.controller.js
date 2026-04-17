const ExperienciaSchema = require("../model/experiencia");

const addExperiencia = (req, res) => {
  try {
    const { organization, role, start, finish, responsibilities } = req.body;

    let organizationUser = organization.trim();
    let roleUser = role.trim();
    let startUser = start.trim();
    let finishUser = finish.trim();
    let responsibilitiesUser = responsibilities.map((item) => item.trim());

    if (
      !organizationUser ||
      !roleUser ||
      !startUser ||
      !finishUser ||
      !responsibilitiesUser
    ) {
      return res.status(400).json({
        ok: false,
        msg: "Todos los campos son obligatorios",
      });
    }

    if (
      !typeof organizationUser === "string" ||
      !typeof roleUser === "string" ||
      !typeof startUser === "string" ||
      !typeof finishUser === "string" ||
      !typeof responsibilitiesUser === "array"
    ) {
      return res.status(400).json({
        ok: false,
        msg: "Error en el tipo de dato de los campos",
      });
    }

    const newExperiencia = new ExperienciaSchema({
      organization: organizationUser,
      role: roleUser,
      start: startUser,
      finish: finishUser,
      responsibilities: responsibilitiesUser.map((item) => item.trim()),
    });

    newExperiencia.save();

    res.status(201).json({
      ok: true,
      msg: "Experiencia laboral agregada exitosamente",
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: `Error inesperado: ${error.message}`,
    });
  }
};


const getExperiencia = async (req, res) => {
  try {
    const experiencia = await ExperienciaSchema.find().select(
      "-__v -createdAt -updatedAt"
    );

    if(!experiencia || experiencia.length === 0) {
      return res.status(404).json({
        ok: false,
        msg: "No se encontro ninguna experiencia laboral",
      });
    }

    res.status(200).json({
      ok: true,
      experiencia,
    });
    
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: `Error inesperado: ${error.message}`,
    });
  }
}

module.exports = { addExperiencia, getExperiencia };
