const express = require('express');
const router = express.Router();
const webinarController = require('../app/controllers/webinar-controller');
const { ensureAuthenticated } = require('../config/auth');

router.get('/', ensureAuthenticated, webinarController.index);
router.get('/:webinarId', ensureAuthenticated, webinarController.show);

router.post('/', ensureAuthenticated, webinarController.create);

router.put('/:webinarId', ensureAuthenticated, webinarController.update);

router.delete('/:webinarId', ensureAuthenticated, webinarController.delete);

module.exports = router;
