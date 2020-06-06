const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
    idClient: String,
    name: String,
    phone: String,
    date: Date,
    location: String,
    totalAmount: String,
    description: String
});

module.exports = mongoose.model('Client', clientSchema);