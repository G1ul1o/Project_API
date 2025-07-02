const express = require('express');
const router = express.Router();
const apiGatewayMiddleware = require('../middleware/apiGatewayMiddleware');

// Ici tu peux router certaines routes vers le microservice User
router.use('/user', apiGatewayMiddleware);

// Autres routes vers d'autres microservices...

module.exports = router;
