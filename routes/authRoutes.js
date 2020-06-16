
const AuthController = require('../controllers/AuthController');
const EmailController = require('../controllers/EmailController');


module.exports = routes => {
    //Facebook Login
    
    routes.post('/facebooklogin', (req,res) => AuthController.facebookLogin(req,res));
};