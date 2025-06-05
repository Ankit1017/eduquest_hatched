
const express = require('express');
const router = express.Router();
const TestReport = require('../models/TestReport');

router.get('/:userId', async (req, res) => {
  try {
    const reports = await TestReport.find(
      { userId: req.params.userId },
      'createdAt score total timeTaken' // Only return essential fields
    )
    .sort({ createdAt: -1 }) // Newest first
    .lean();

    res.json(reports.map(report => ({
      _id: report._id,
      date: report.createdAt,
      score: report.score,
      total: report.total,
      timeTaken: report.timeTaken
    })));

  } catch (error) {
    res.status(500).json({
      message: 'Error fetching reports',
      error: error.message
    });
  }
});

// GET detailed report by ID
router.get('/:userId/:reportId', async (req, res) => {
  try {
    const report = await TestReport.findOne({
      _id: req.params.reportId,
      userId: req.params.userId
    })
    .populate('questions.questionId', 'question topicTags') // Optional: populate question details
    .lean();

    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }

    // Format response
    const response = {
      _id: report._id,
      createdAt: report.createdAt,
      score: report.score,
      total: report.total,
      timeTaken: report.timeTaken,
      avgTimePerQ: report.avgTimePerQ,
      questions: report.questions.map(q => ({
        question: q.questionText,
        options: q.options,
        userAnswer: q.userAnswer,
        correctAnswer: q.correctOption,
        isCorrect: q.isCorrect,
        topics: q.topics
      })),
      topicAccuracy: report.topicAccuracy
    };

    res.json(response);

  } catch (error) {
    res.status(500).json({
      message: 'Error fetching report details',
      error: error.message
    });
  }
});

module.exports = router;
