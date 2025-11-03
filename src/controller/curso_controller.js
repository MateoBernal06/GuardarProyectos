
const CursoSchema = require("../model/curso.js");

const crearCurso = async(req, res) =>{
    try {
        const {name, description, duration, organization} = req.body
        if(!name || !description || !duration|| !organization ){
            return res
                .status(400)
                .json({
                    msg: "Todos los Campos obligatorios"
                })
        }

        const compararName = await CursoSchema.findOne({
            name: name.trim()
        })

        if(compararName){
            return res
                .status(400)
                .json({
                    msg: "Un curso ya posee ese nombre"
                })
        }

        if(!parseInt(duration)){
            return res
                .status(404)
                .json({
                    msg: "La duracion del curso no es valida"
                })
        }

        if (!req.file || !req.file.path) {
            return res
                .status(400)
                .json({ msg: "La imagen es obligatoria" });
        }

        const newCurso = new CursoSchema({
            name: name.trim(),
            description: description.trim(),
            duration,
            organization: organization.trim(),
            imagen: req.file.path
        });

        await newCurso.save()

        res
            .status(200)
            .json({
                msg: "Curso creado exitosamente",
                datos: newCurso,
            });

    } catch (error) {
        res
            .status(500)
            .json({
                msg: `Se produjo un error inesperado: ${error.message}`,
            });
    }
}

module.exports = {
    crearCurso
}