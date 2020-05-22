const mongoose = require('mongoose');
const User = mongoose.model('users');

module.exports = app => {
    app.get(
        '/', 
        () => {
            User.findOne({ userId: 1 })
                .then((user) => {
                    console.log(user);
                });        
        }
    );
};
