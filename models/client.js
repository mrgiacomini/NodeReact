const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
    idClient: String,
    name: String,
    date: Date,
    location: String,
    totalAmount: String
});

module.exports = mongoose.model('Client', clientSchema);