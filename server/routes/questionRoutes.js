const express = require('express');
const router = express.Router();
const Question = require('../models/Question');
const { default: axios } = require('axios');

// GET all questions
router.get('/', async (req, res) => {
    console.log("hitted")
    try {
        const questions = await Question.find();
        res.json(questions);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});



// Function to get the tags from the backend
async function generateTags(question) {
  const apiKey = 'AIzaSyAuwYTrhNjSGNwoXD5jfbZlLIsHsU9QlS8'; // Replace with your actual key!
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

  const data = {
    contents: [
      {
        parts: [
          {
            text: `generate the topic tags form the following question in english only and give it in a array format and only give meaning full topic: ${question}`
          }
        ]
      }
    ]
  };

  try {
    const response = await axios.post(url, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // The Gemini API returns the result in response.data.candidates[0].content.parts[0].text
    const text = response.data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

    // Try to parse the tags array from the response text
    let tags;
    try {
      tags = JSON.parse(text);
      // If it's not an array, fallback to splitting
      if (!Array.isArray(tags)) throw new Error();
    } catch {
      // Fallback: extract array-like content from the text
      const match = text.match(/\[([^\]]+)\]/);
      if (match) {
        tags = match[1].split(',').map(s => s.replace(/['"\s]/g, '').trim()).filter(Boolean);
      } else {
        // Fallback: split by new lines or commas
        tags = text.split(/[\n,]+/).map(s => s.replace(/['"\s]/g, '').trim()).filter(Boolean);
      }
    }

    console.log(tags);
    return tags;
  } catch (error) {
    console.error('Error generating content:', error.response?.data || error.message);
    return [];
  }
}

// POST a new question
router.post('/', async (req, res) => {
    const { question, authorId, options, correctOption } = req.body;

    if (!Array.isArray(options) || options.length !== 4) {
        return res.status(400).json({ message: 'There must be exactly 4 options.' });
    }

    const tags = await generateTags(question);
    console.log(tags)

    const newQuestion = new Question({
        question,
        authorId,
        options,
        correctOption,
        topicTags: tags,
    });

    console.log(newQuestion);

    try {
        const savedQuestion = await newQuestion.save();
        res.status(201).json(savedQuestion);

        // res.status(201).json(newQuestion)
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;