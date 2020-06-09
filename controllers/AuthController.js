const User = require('../models/user');
const expressJwt  = require('express-jwt');
const jwt = require('jsonwebtoken');
const axios = require('axios');

exports.requireSignin = () => {
    return  expressJwt({
        secret: process.env.JWT_SECRET // req.user._id
    });
};

exports.facebookLogin = (req, res) => {
    const { userID, accessToken } = req.body;

    const url = `https://graph.facebook.com/${userID}/?fields=id,name,email&access_token=${accessToken}`;

    return (
        axios.get(url)
            .then(response => {
                const { email, name } = response.data;

                User.findOne({ email: email }).then((user) => {
                   console.log(user)
                    if (user) {
                        // const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
                        //     expiresIn: '7d'
                        // });

                        return res.json({
                            //token,
                            user: user
                        });
                    } else {

                        let newUser = new User({ name, email });
                        
                        User.create(newUser)
                        .then((data) => {
                           
                            // const token = jwt.sign(
                            // { _id: data._id },
                            // process.env.JWT_SECRET,
                            // { expiresIn: '7d' }
                            // );

                            return res.json({
                                //token,
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
