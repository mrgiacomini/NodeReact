const mongoose = require('mongoose');
const User = mongoose.model('users');

module.exports = app => {
    app.get(
        '/', 
        (req,res) => {
            User.find().sort({createdAt: -1}).limit(1)
                .then((user) => {
                    console.log(user);
                    if (user.length) {
                        res.send(user);
                    } else {
                        new User ({ userId: 1}).save().then((user) => { res.send(user) });
                    }
                });        
        }
    );
};
