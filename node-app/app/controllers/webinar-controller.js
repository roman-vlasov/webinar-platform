const Webinar = require('../models/webinar-model');

// Создает вебинар
exports.create = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Webinar content can not be empty"
        });
    }

    const webinar = new Webinar({
        title: req.body.title,
        description: req.body.description,
        image: req.body.image,
        url: req.body.url,
        state: req.body.state,
        authorName: req.user.name
    });

    webinar.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while creating the webinar."
        });
    });
};

// Возвращает список вебинаров
exports.index = (req, res) => {
    Webinar.find()
        .then(webinars => {
            res.send(webinars);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving webinars."
        });
    });
};

// Возвращает вебинар
exports.show = (req, res) => {
    Webinar.findById(req.params.webinarId)
        .then(webinar => {
            if (!webinar) {
                return res.status(404).send({
                    message: "Webinar not found with id " + req.params.webinarId
                });
            }
            res.send(webinar);
        }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Webinar not found with id " + req.params.webinarId
            });
        }
        return res.status(500).send({
            message: "Something wrong retrieving webinar with id " + req.params.webinarId
        });
    });
};

// Редактирует вебинар
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        return res.status(400).send({
            message: "Webinar content can not be empty"
        });
    }

    Webinar.findByIdAndUpdate(req.params.webinarId, {
        title: req.body.title,
        description: req.body.description,
        image: req.body.image,
        url: req.body.url,
        state: req.body.state
    }, {new: true})
        .then(webinar => {
            if (!webinar) {
                return res.status(404).send({
                    message: "Webinar not found with id " + req.params.webinarId
                });
            }
            res.send(webinar);
        }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Webinar not found with id " + req.params.webinarId
            });
        }
        return res.status(500).send({
            message: "Something wrong updating note with id " + req.params.webinarId
        });
    });
};

// Удаляет вебинар
exports.delete = (req, res) => {
    Webinar.findByIdAndRemove(req.params.webinarId)
        .then(webinar => {
            if (!webinar) {
                return res.status(404).send({
                    message: "Webinar not found with id " + req.params.webinarId
                });
            }
            webinar.deleteAllPolls();
            res.send({message: "Webinar deleted successfully!"});
        }).catch(err => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Webinar not found with id " + req.params.webinarId
            });
        }
        return res.status(500).send({
            message: "Could not delete webinar with id " + req.params.webinarId
        });
    });
};
