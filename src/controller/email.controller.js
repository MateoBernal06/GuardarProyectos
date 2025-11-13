
const {transporter} = require('../config/nodemailer.js');
require('dotenv').config()

const sendMsg = async(req, res) => {
    const { name, subject, email, message } = req.body;

    if(!name || !email || !message ||!subject){
        return res.status(400).json({
            msg: "Campos vacíos",
        });
    }

    const datos = {
        nameUser: (name || "").trim(),
        subjectUser: (subject || "").trim(),
        emailUser: (email || "").trim(),
        messageUser: (message || "").trim(),
    };

    const info = await transporter.sendMail({
        from: `"Formulario Web" <${datos.emailUser}>`,
        to: process.env.EMAIL_GOOGLE,
        subject: datos.subjectUser,
        html: `
                    <h3>Mensaje de ${datos.nameUser}</h3>
                    <p><b>Correo:</b> ${datos.emailUser}</p>
                    <p><b>Mensaje:</b> ${datos.messageUser}</p>
                `,
        replyTo: datos.emailUser
    });

    res
        .status(200)
        .json({
            msg : 'Mensaje enviado exitosamente',
            info : `${info.messageId}`
        })
}

module.exports = {sendMsg}