const Client = require('../models/client');

module.exports = clientRoutes => {
    clientRoutes.get('/clients/:userId', (req,res) => {
        Client.find({ userId: req.params.userId }).sort({ _id: 'desc'})
        .then(clients => res.json(clients))
        .catch(error => res.json(error))    
    });

    clientRoutes.post('/addClient', (req, res) => {
        Client.create(req.body)
        .then(client => res.json(client))
        .catch(error => res.json(error))
    });
    
    clientRoutes.put('/updateClient/:id', (req, res) => {
        Client.findByIdAndUpdate(req.params.id, req.body)
        .then(client => res.json(client))
        .catch(error => res.json(error))
    });
    
    clientRoutes.delete('/deleteClient/:id', (req, res) => {
        Client.findByIdAndDelete(req.params.id)
        .then(client => res.json(client))
        .catch(error => res.json(error))
    });
};