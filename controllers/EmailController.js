const nodemailer = require("nodemailer");
const keys = require('../config/keys');

exports.sendEmail = async (req,res) => {    
    const user = keys.EMAIL_USER;
    const pass = keys.EMAIL_PASS_USER;

    const emailTo = req.body.email;
    const description = req.body.description;

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: user,
            pass: pass
        }
    });
    
    var mailOptions = {
        from: user,
        to: emailTo,
        subject: '',
        text: description
    };
    
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            return res.json(error);
        } else {
            return res.json(info.response);
        }
    });

};