
const CursoSchema = require("../model/curso.js");

const crearCurso = async(req, res) =>{
    try {
        const {name, description, duration, organization, imagen} = req.body
        if(!name || !description || !duration|| !organization || !imagen){
            return res
                .status(400)
                .send({
                    msg: "Todos los Campos obligatorios"
                })
        }

        const compararName = await CursoSchema.findOne({
            name: name.trim()
        })

        if(compararName){
            return res
                .status(400)
                .send({
                    msg: "Un curso ya posee ese nombre"
                })
        }

        if(!parseInt(duration)){
            return res
                .status(404)
                .send({
                    msg: "La duracion del curso no es valida"
                })
        }

        const newCurso = new CursoSchema({
            name,
            description,
            duration,
            organization,
            imagen
        });

        await newCurso.save()

        res.status(200).send({
            msg: "Curso creado exitosamente",
            datos: {
                name,
                description,
                duration,
                organization,
                imagen
            },
        });

    } catch (error) {
        res
            .status(500)
            .send({
                msg: `Se produjo un error inesperado: ${error.message}`,
            });
    }
}

module.exports = {
    crearCurso
}