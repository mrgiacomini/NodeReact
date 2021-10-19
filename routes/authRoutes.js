const AuthController = require('../controllers/AuthController');


module.exports = routes => {
    //Login com email e biometria
    routes.post('/login', (req,res) => AuthController.login(req,res));
};