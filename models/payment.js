const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema(
    {
        clientId: String,
        date: Date,
        amount: String
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Payment', paymentSchema);