const Client = require('../models/client');
const express = require('express');
const authMiddleware = require('.././midleware/auth');

const router = express.Router();

//router.use(authMiddleware);

router.get('/clients', (req,res) => {
    Client.find({ userId: req.userId }).sort({ _id: 'desc'})
    .then(clients => res.json(clients))
    .catch(error => res.json(error))    
});

router.post('/addClient', (req, res) => {
    Client.create(req.body)
    .then(client => res.json(client))
    .catch(error => res.json(error))
});

router.put('/updateClient/:id', (req, res) => {
    Client.findByIdAndUpdate(req.params.id, req.body)
    .then(client => res.json(client))
    .catch(error => res.json(error))
});

router.delete('/deleteClient/:id', (req, res) => {
    Client.findByIdAndDelete(req.params.id)
    .then(client => res.json(client))
    .catch(error => res.json(error))
});

module.exports = app => app.use('/', router);
