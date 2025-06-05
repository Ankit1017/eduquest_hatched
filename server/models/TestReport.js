const mongoose = require('mongoose');


const testReport = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  score: { type: Number, required: true },
  total: { type: Number, required: true },
  timeTaken: { type: Number, required: true },
  avgTimePerQ: { type: Number, required: true },
  unattempted: { type: Number, required: true },
  questions: [{
    questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
    questionText: String,
    options: [String],
    userAnswer: Number,
    correctOption: Number,
    isCorrect: Boolean,
    topics: [String]
  }],
  topicAccuracy: [{
    name: String,
    correct: Number,
    total: Number
  }]
}, { timestamps: true });


module.exports = mongoose.model('TestReport', testReport);