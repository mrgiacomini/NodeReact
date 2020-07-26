const express = require('express');
const authMiddleware = require('../midleware/auth');
const router = express.Router();

const NfseController = require('../controllers/NFSeController');

router.use(authMiddleware);

router.get('/nfe', (req,res) => NfseController.get(req,res));

module.exports = app => app.use('/api/nfe', router);

