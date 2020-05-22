const mongoose = require('mongoose');
const User = mongoose.model('users');

module.exports = app => {
    app.get(
        '/', 
        (res,req) => {
            User.find().sort({createdAt: -1})[0]
                .then((user) => {
                    if (user) {
                        res.send(user);
                    } else {
                        new User ({ userId: 1})
                    }
                });        
        }
    );
};
