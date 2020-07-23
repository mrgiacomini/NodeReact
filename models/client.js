const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema(
    {
        idClient: String,
        userId: String,
        name: String,
        phone: String,
        email: String,
        date: Date,
        location: String,
        totalAmount: String,
        description: String,
        completed: Boolean
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Client', clientSchema);