
const AuthController = require('../controllers/AuthController');


module.exports = routes => {
    //Facebook Login
    
    routes.post('/facebooklogin', (req,res) => AuthController.facebookLogin(req,res));
};