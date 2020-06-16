const jwt = require('jsonwebtoken');
const axios = require('axios');

const User = require('../models/user');
const keys = require('../config/keys');

function generateToken(params = {}) {
    return jwt.sign(params, keys.JWT_SECRET, {
      expiresIn: 86400,
    });
}

exports.facebookLogin = (req, res) => {
    const { userID, accessToken } = req.body;

    const url = `https://graph.facebook.com/${userID}/?fields=id,name,email&access_token=${accessToken}`;
    console.log('get na url '+ url);
    return (
        axios.get(url)
            .then(response => {
                console.log('get sucesso');
                const { email, name } = response.data;
                console.log('find user');
                User.findOne({ email: email }).then((user) => {
                    if (user) {
                        console.log('user encontrado');
                        return res.json({
                            token: generateToken({id: user._id}),
                            user: user
                        });
                    } else {

                        let newUser = new User({ name, email });
                        console.log('criando usuario');
                        User.create(newUser)
                        .then((data) => {
                            console.log('usuario criado');
                            return res.json({
                                token: generateToken({id: user._id}),
                                user: data
                            });
                        })
                        .catch(error => res.json(error));
                    }
                });
            })
            .catch(error => {
                console.log('erro no get');
                res.json({
                    error
                });
            })
    );
};
