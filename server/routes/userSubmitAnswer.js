const express = require('express');
const router = express.Router();
const Question = require('../models/Question');
const UserAnswer = require('../models/UserAnwser');
const TestReport = require('../models/TestReport');

router.post('/', async (req, res) => {
    const { userId, userAnswers, startTime } = req.body;

    try {
        // Fetch all questions attempted
        const questions = await Question.find({ _id: { $in: Object.keys(userAnswers) } });
        let score = 0;
        const userAnswerRecords = [];
        const topicMap = {};
        const reportQuestions = [];

        // For each question, build user answer and report data
        questions.forEach((question) => {
            const userAnswer = userAnswers[question._id];
            const isCorrect = question.correctOption === userAnswer;

            if (isCorrect) score += 1;

            // Track topic accuracy
            question.topicTags.forEach(topic => {
                topicMap[topic] = topicMap[topic] || { correct: 0, total: 0 };
                topicMap[topic].total++;
                if (isCorrect) topicMap[topic].correct++;
            });

            // User answer record
            userAnswerRecords.push({
                userId,
                questionId: question._id,
                selectedOption: userAnswer,
                isCorrect,
                topics: question.topicTags,
            });

            // For the report
            reportQuestions.push({
                questionId: question._id,
                questionText: question.question,
                options: question.options,
                userAnswer,
                correctOption: question.correctOption,
                isCorrect,
                topics: question.topicTags
            });
        });

        // Compute timeTaken and avgTimePerQ safely
        let timeTaken = 0;
        let avgTimePerQ = 0;
        if (startTime && questions.length > 0) {
            timeTaken = Math.floor((Date.now() - startTime) / 1000);
            timeTaken = Math.max(timeTaken, 0);
            avgTimePerQ = timeTaken / questions.length;
            if (isNaN(avgTimePerQ) || !isFinite(avgTimePerQ)) {
                avgTimePerQ = 0;
            }
        }

        // Calculate unattempted if needed
        const totalQuestions = questions.length;
        let unattempted = 0;
        questions.forEach(q => {
            if (userAnswers[q._id] === undefined || userAnswers[q._id] === null) {
                unattempted++;
            }
        });

        // Build topic accuracy array
        const topicAccuracy = Object.entries(topicMap).map(([name, stats]) => ({
            name,
            correct: stats.correct,
            total: stats.total
        }));

        // Create and save the report
        const testReport = new TestReport({
            userId,
            score,
            total: totalQuestions,
            timeTaken,
            avgTimePerQ,
            unattempted,
            questions: reportQuestions,
            topicAccuracy
        });

        const [savedReport] = await Promise.all([
            testReport.save(),
            UserAnswer.insertMany(userAnswerRecords)
        ]);

        res.json({
            score,
            total: totalQuestions,
            reportId: savedReport._id
        });

    } catch (error) {
        console.error('Error submitting answers:', error);
        res.status(500).json({
            message: 'Error submitting answers',
            error: error.message
        });
    }
});

module.exports = router;
