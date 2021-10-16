const express = require('express');
const authMiddleware = require('../midleware/auth');
const router = express.Router();

const NfseController = require('../controllers/NFSeController');

router.use(authMiddleware);

router.post('/printNfse', (req,res) => NfseController.printNfse(req,res));

router.post('/getByNumber', (req,res) => NfseController.getByNumber(req,res));

router.post('/get', (req,res) => NfseController.get(req,res));

module.exports = app => app.use('/api/nfe', router);

