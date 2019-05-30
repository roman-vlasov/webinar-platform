const Answer = require('../models/answer-model');

// Создает ответ на вопрос
exports.create = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Answer content can not be empty"
        });
    }

    const answer = new Answer({
        questionId: req.body.questionId,
        userId: req.body.userId,
        answerIndex: req.body.answerIndex,
        right: req.body.right,
    });

    answer.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while creating the answer."
        });
    });
};
