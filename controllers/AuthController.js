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
    return (
        axios.get(url)
            .then(response => {
                const { email, name } = response.data;
                User.findOne({ email: email }).then((user) => {
                    if (user) {
                        return res.json({
                            token: generateToken({id: user._id, role: user.role}),
                            user: user
                        });
                    } else {

                        let newUser = new User({ name, email });
                        User.create(newUser)
                        .then((data) => {
                            return res.json({
                                token: generateToken({id: user._id, role: user.role}),
                                user: data
                            });
                        })
                        .catch(error => res.json(error));
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
