const express = require('express');
const router = express.Router();
const pollsController = require('../app/controllers/poll-controller');
const { ensureAuthenticated } = require('../config/auth');

router.get('/', ensureAuthenticated, pollsController.findAllByWebinar);
router.get('/:pollId', ensureAuthenticated, pollsController.show);

router.post('/', ensureAuthenticated, pollsController.create);

router.put('/:pollId', ensureAuthenticated, pollsController.update);

router.delete('/:pollId', ensureAuthenticated, pollsController.delete);

module.exports = router;
