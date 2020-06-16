const nodemailer = require("nodemailer");
const { getMaxListeners } = require("../models/user");

exports.sendEmail = async (req,res) => {    
    const user = process.env.EMAIL_USER;
    const pass = process.env.EMAIL__PASS_USER;

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: user,
            pass: pass
        }
    });
    console.log('transport')

    var mailOptions = {
        from: user,
        to: "matheus.dua@hotmail.com",
        subject: 'Enviando um email pelo Node.js',
        text: 'Muito fácil enviar um email pelo node, tente você também!'
    };
    console.log('enviando')
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email enviado: ' + info.response);
        }
    });

};