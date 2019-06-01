const Answer = require('../models/answer-model');
const Poll = require('../models/poll-model');

// Создает ответ на вопрос
exports.create = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Answer content can not be empty"
        });
    }

    Answer.findOne({questionId: req.body.questionId, userId: req.body.userId})
        .then(existed_answer => {
            if (existed_answer) {
                return res.status(400).send({
                    message: "Answer exists"
                });
            }
        });

    Poll.findById(req.body.questionId).then(poll => {
        if (poll) {
            const isRightAnswer = poll.rightAnswerIndex === req.body.answerIndex;
            const answer = new Answer({
                questionId: req.body.questionId,
                userId: req.body.userId,
                answerIndex: req.body.answerIndex,
                right: isRightAnswer
            });

            answer.save()
                .then(data => {
                    res.send(data);
                }).catch(err => {
                res.status(500).send({
                    message: err.message || "Something wrong while creating the answer."
                });
            });
        } else {
            return res.status(400).send({
                message: "Poll don't exists"
            });
        }
    });
};
