const Client = require('../models/client');
const express = require('express');
const authMiddleware = require('.././midleware/auth');

const ClientController = require('../controllers/ClientController');
const EmailController = require('../controllers/EmailController');

const router = express.Router();

router.use(authMiddleware);

router.get('/clients', (req,res) => ClientController.getByUser(req,res));

router.post('/addClient', (req, res) => ClientController.addClient(req,res));

router.put('/updateClient/:id', (req, res) => ClientController.updateClient(req,res));

router.delete('/deleteClient/:id', (req, res) => ClientController.deleteClient(req,res));

router.post('/sendEmail', (req, res) => EmailController.sendEmail(req,res));

router.post('/addPayment', (req, res) => ClientController.addPayment(req,res) );

router.post('/payments', (req, res) => ClientController.getPayments(req,res) );

module.exports = app => app.use('/api', router);
