const Webinar = require('../models/webinar-model.js');

//Create new Webinar
exports.create = (req, res) => {
    // Request validation
    if(!req.body) {
        return res.status(400).send({
            message: "Webinar content can not be empty"
        });
    }

    // Create a Webinar
    const webinar = new Webinar({
        title: req.body.title || "Webinar",
        description: req.body.description,
        image: req.body.image,
        url: req.body.url
    });

    // Save Webinar in the database
    webinar.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
            message: err.message || "Something wrong while creating the webinar."
        });
    });
};

// Retrieve all webinars from the database.
exports.findAll = (req, res) => {
    Webinar.find()
        .then(webinars => {
            res.send(webinars);
        }).catch(err => {
            res.status(500).send({
            message: err.message || "Something wrong while retrieving webinars."
        });
    });
};

// Find a single webinar with a webinarId
exports.findOne = (req, res) => {
    Webinar.findById(req.params.webinarId)
        .then(webinar => {
            if(!webinar) {
                return res.status(404).send({
                    message: "Webinar not found with id " + req.params.webinarId
                });
            }
            res.send(webinar);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Webinar not found with id " + req.params.webinarId
            });
        }
        return res.status(500).send({
            message: "Something wrong retrieving webinar with id " + req.params.webinarId
        });
    });
};

// Update a webinar
exports.update = (req, res) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "Webinar content can not be empty"
        });
    }

    // Find and update webinar with the request body
    Webinar.findByIdAndUpdate(req.params.webinarId, {
        title: req.body.title,
        description: req.body.description,
        image: req.body.image,
        url: req.body.url
    }, { new: true })
        .then(webinar => {
            if(!webinar) {
                return res.status(404).send({
                    message: "Webinar not found with id " + req.params.webinarId
                });
            }
            res.send(webinar);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Webinar not found with id " + req.params.webinarId
            });
        }
        return res.status(500).send({
            message: "Something wrong updating note with id " + req.params.webinarId
        });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Webinar.findByIdAndRemove(req.params.webinarId)
        .then(webinar => {
            if(!webinar) {
                return res.status(404).send({
                    message: "Webinar not found with id " + req.params.webinarId
                });
            }
            res.send({message: "Webinar deleted successfully!"});
        }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Webinar not found with id " + req.params.webinarId
            });
        }
        return res.status(500).send({
            message: "Could not delete webinar with id " + req.params.webinarId
        });
    });
};
