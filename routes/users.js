const express = require('express');
const router = express.Router();
const userController = require('../app/controllers/user-controller');
const { forwardAuthenticated } = require('../config/auth');

router.get('/login', forwardAuthenticated, (req, res) => res.render('users/login'));
router.get('/register', forwardAuthenticated, (req, res) => res.render('users/register'));
router.get('/logout', userController.logout);

router.post('/register', userController.create);
router.post('/login', userController.login);

module.exports = router;
