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
    const { accessToken } = req.body;
    const url = `https://graph.facebook.com/me?access_token=${accessToken}&fields=id,name,email`;
    return (
        axios.get(url)
            .then(response => {
                const { email, name, id } = response.data;
                
                User.findOne({ $or:[{email: email}, {facebookID: id}] }).then((user) => {
                    console.log(user)
                    if (user) {
                        return res.json({
                            token: generateToken({id: user._id, role: user.role}),
                            user: user
                        });
                    } else {
                        
                        let newUser = new User({ name, email, facebookID: id });
                        User.create(newUser)
                        .then((data) => {
                            return res.json({
                                token: generateToken({id: data._id, role: data.role}),
                                user: data
                            });
                        })
                        .catch(error => res.json(error));
                        //res.status(401).send({error: 'Não cadastrado!'});
                    }
                });
            })
            .catch(error => {
                res.json({
                    error
                });
            })
    );
};
