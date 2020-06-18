const Client = require('../models/client');
const Payment = require('../models/payment');

exports.getByUser = async (req,res) => {
        if (!!req.userId) { 
            var clients = await Client.find({ userId: req.userId }).sort({ _id: 'desc'}).exec();
            clients = clients.map((client) => (client.toObject()));

            if (!!clients.length) 
                for(var client of clients)
                {   
                    const payments = await Payment.find({ clientId:client._id }).exec();                    
                    client.totalPayments = payments.reduce((accumulator, current) => +accumulator + +current.amount, 0);
                    client.quantityPayments = payments.length;
                }

            res.json(clients);
        }
        else 
            res.json();
};

exports.addClient = (req, res) => {
    Client.create(req.body)
    .then(client => res.json(client))
    .catch(error => res.json(error))
};

exports.updateClient = (req, res) => {
    Client.findByIdAndUpdate(req.params.id, req.body)
    .then(client => res.json(client))
    .catch(error => res.json(error))
};

exports.deleteClient = (req, res) => {
    Client.findByIdAndDelete(req.params.id)
    .then(client => res.json(client))
    .catch(error => res.json(error))
};

exports.getPayments = (req, res) => {
    Payment.find({ clientId: req.body.clientId }).sort({date: 'desc'})
    .then(payments => res.json(payments))
    .catch(error => res.json(error))    
};

exports.addPayment = (req, res) => {
    Payment.create(req.body)
    .then(payment => res.json(payment))
    .catch(error => res.json(error))    
};

exports.deletePayment = (req, res) => {
    Payment.findByIdAndDelete(req.params.id)
    .then(payment => res.json(payment))
    .catch(error => res.json(error))
};
