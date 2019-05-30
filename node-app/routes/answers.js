const express = require('express');
const router = express.Router();
const answersController = require('../app/controllers/answer-controller');
const { ensureAuthenticated } = require('../config/auth');

router.post('/', ensureAuthenticated, answersController.create);

module.exports = router;
