const express = require('express');
const userRoutes = express.Router();
const userController = require('../controllers/userController');

userRoutes.post('/register', userController.register);
userRoutes.post('/login', userController.login);
userRoutes.post('/register/google', userController.registerWithGoogle);;

module.exports = userRoutes;
