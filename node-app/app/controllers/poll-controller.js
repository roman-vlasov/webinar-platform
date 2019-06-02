const Poll = require('../models/poll-model');

// Создает опрос
exports.create = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Poll content can not be empty"
        });
    }

    const poll = new Poll({
        pollId: req.body.pollId,
        question: req.body.question,
        answers: req.body.answers
    });

    poll.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while creating the poll."
        });
    });
};

// Возвращает список опросов для вебинара
exports.findAllByWebinar = (req, res) => {
    Poll.find({webinar: req.params.webinarId})
        .then(polls => {
            res.send(polls);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving polls."
        });
    });
};

// Возвращает опрос
exports.show = (req, res) => {
    Poll.findById(req.params.pollId)
        .then(poll => {
            if (!poll) {
                return res.status(404).send({
                    message: "Poll not found with id " + req.params.pollId
                });
            }
            res.send(poll);
        }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Poll not found with id " + req.params.pollId
            });
        }
        return res.status(500).send({
            message: "Something wrong retrieving poll with id " + req.params.pollId
        });
    });
};

// Редактирует опрос
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        return res.status(400).send({
            message: "Poll content can not be empty"
        });
    }

    Poll.findByIdAndUpdate(req.params.pollId, {
        pollId: req.body.pollId,
        question: req.body.question,
        answers: req.body.answers
    }, {new: true})
        .then(poll => {
            if (!poll) {
                return res.status(404).send({
                    message: "Poll not found with id " + req.params.pollId
                });
            }
            res.send(poll);
        }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Poll not found with id " + req.params.pollId
            });
        }
        return res.status(500).send({
            message: "Something wrong updating poll with id " + req.params.pollId
        });
    });
};

// Удаляет опрос
exports.delete = (req, res) => {
    Poll.findByIdAndRemove(req.params.pollId)
        .then(poll => {
            if (!poll) {
                return res.status(404).send({
                    message: "Poll not found with id " + req.params.pollId
                });
            }
            poll.deleteAllAnswer();
            res.send({message: "Poll deleted successfully!"});
        }).catch(err => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Poll not found with id " + req.params.pollId
            });
        }
        return res.status(500).send({
            message: "Could not delete poll with id " + req.params.pollId
        });
    });
};

// Запустить опрос
exports.start = (pollId, socket) => {
    Poll.findById(pollId)
        .then(poll => {
            if (!poll) {
                return res.status(404).send({
                    message: "Poll not found with id " + pollId
                });
            }
            poll.state = 'ONLINE';
            poll.save()
                .then(data => {
                    res.send(data);
                }).catch(err => {
                res.status(500).send({
                    message: err.message || "Something wrong while creating the poll."
                });
            });
            socket.emit('poll_started' , {poll: poll});
        }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Poll not found with id " + pollId
            });
        }
        return res.status(500).send({
            message: "Something wrong retrieving poll with id " + pollId
        });
    });
};