const mongoose = require('mongoose');
const Answer = require('../models/answer-model');

const AnswerOptionSchema = new mongoose.Schema({ value: {type: String, required: true}, right: {type: Boolean, required: true} });

/* Схема БД. */
const PollSchema = mongoose.Schema({
        // Вебинар
        webinar: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Webinar'
        },
        // Текст вопроса
        question: {type: String, required: true},
        // Ответы
        answers: {type: [AnswerOptionSchema], required: true},
        // Индекс правильного ответа
        rightAnswerIndex: {type: Number},
        // Состояние опроса
        state: {type: String, enum: ['NOT_STARTED', 'ONLINE', 'COMPLETED'], default: 'NOT_STARTED'}
    }, {timestamps: true}
);

/* Методы класса. */
PollSchema.methods = {
    /**
     * Удаляет все ответы на опрос.
     */
    deleteAllAnswer: function () {
        Answer.remove({questionId: this.id.str});
    }
};

module.exports = mongoose.model('Polls', PollSchema);
