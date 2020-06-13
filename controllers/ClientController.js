const Client = require('../models/client');

exports.getByUser = (req,res) => {
    console.log(req.userId)
        if (!!req.userId)
            Client.find({ userId: req.userId }).sort({ _id: 'desc'})
            .then(clients => res.json(clients))
            .catch(error => res.json(error))    
        else 
            res.json();
;}

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
