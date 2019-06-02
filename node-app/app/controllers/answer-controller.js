const Answer = require('../models/answer-model');
const Poll = require('../models/poll-model');

function eqSet(as, bs) {
    if (as.size !== bs.size) return false;
    for (var a of as) if (!bs.has(a)) return false;
    return true;
}

// Создает ответ на вопрос
exports.create = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Answer content can not be empty"
        });
    }

    Poll.findById(req.body.pollId).then(poll => {
        console.log('inside')
        if (poll) {
            const rightAnswersIds = poll.answers.filter(item =>item.right).map(item => item._id.toString());
            const answerResult = eqSet(new Set(rightAnswersIds), new Set(req.body.selectedAnswers));
            const answer = new Answer({
                questionId: req.body.pollId,
                userId: req.user._id,
                selectedAnswers: req.body.selectedAnswers,
                right: answerResult
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
                message: "Poll don't exists " + req.params.pollId
            });
        }
    });
};
