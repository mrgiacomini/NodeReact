const Client = require('./models/client');

module.exports = routes => {
    routes.get('/clients', (req,res) => {
        Client.find({})
        .then(clients => res.json(clients))
        .catch(error => res.json(error))    
    });

    routes.post('/addClient', (req, res) => {
        Client.create(req.body)
        .then(client => res.json(client))
        .catch(error => res.json(error))
    });
};