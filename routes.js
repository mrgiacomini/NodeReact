const Client = require('./models/client');

module.exports = routes => {
    routes.get('/clients', (req,res) => {
        Client.find({}).sort({ _id: 'desc'})
        .then(clients => res.json(clients))
        .catch(error => res.json(error))    
    });

    routes.post('/addClient', (req, res) => {
        Client.create(req.body)
        .then(client => res.json(client))
        .catch(error => res.json(error))
    });
    
    routes.put('/updateClient/:id', (req, res) => {
        Client.findByIdAndUpdate(req.params.id, req.body)
        .then(client => res.json(client))
        .catch(error => res.json(error))
    });
    
    routes.delete('/:id', (req, res) => {
        Client.findByIdAndDelete(req.params.id)
        .then(client => res.json(client))
        .catch(error => res.json(error))
    });
};