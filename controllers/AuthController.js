const jwt = require('jsonwebtoken');
const axios = require('axios');

const User = require('../models/user');
const keys = require('../config/keys');

function generateToken(params = {}) {
    return jwt.sign(params, keys.JWT_SECRET, {
      expiresIn: 3600, // 1h
    });
}

exports.login = (req, res) => {
    const { email } = req.body;

    return (                       
        User.findOne({email: email}).then((user) => {
            if (user) {
                return res.json({
                    token: generateToken({id: user._id, role: user.role}),
                    user: user
                });
            } else {                        
                res.status(401).send({error: 'Não cadastrado!'});
            }
        })           
    );
};