const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema(
    {
        idClient: String,
        userId: String,
        name: String,
        phone: String,
        date: Date,
        location: String,
        totalAmount: String,
        description: String
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Client', clientSchema);