import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {host} from '../config'

// Centralized dark theme palette for QuestionList
const darkTheme = {
  background: '#101a28',
  card: '#181b22',
  accent: '#64b5f6',
  textPrimary: '#e3f2fd',
  border: '1.5px solid #23272f',
  cardShadow: '0 8px 32px rgba(25,118,210,0.18)',
  optionBg: '#23272f',
  optionBorder: '#31343c',
  correct: '#43a047'
};

const QuestionList = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get(`${host}/api/questions`);
        setQuestions(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, []);

  if (loading) {
    return (
      <div style={{
        color: darkTheme.accent,
        textAlign: 'center',
        margin: '48px 0'
      }}>
        Loading questions...
      </div>
    );
  }

  return (
    <div style={{
      margin: '60px auto 0 auto',
      maxWidth: 800,
      width: '100%',
      padding: '0 12px'
    }}>
      <h2 style={{
        color: darkTheme.accent,
        marginBottom: 18,
        fontWeight: 700,
        textAlign: 'center'
      }}>
        All Questions
      </h2>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {questions.map((question) => (
          <li
            key={question._id}
            style={{
              background: darkTheme.card,
              border: darkTheme.border,
              borderRadius: 14,
              boxShadow: darkTheme.cardShadow,
              marginBottom: 24,
              padding: '22px 20px',
              color: darkTheme.textPrimary
            }}
          >
            <p style={{ fontWeight: 600, fontSize: '1.08rem', marginBottom: 8 }}>
              <span style={{ color: darkTheme.accent }}>Question:</span> {question.question}
            </p>
            <p style={{ margin: '4px 0 8px 0', color: darkTheme.textPrimary }}>
              <strong>Author ID:</strong> {question.authorId}
            </p>
            <div>
              <strong>Options:</strong>
              <ul style={{ paddingLeft: 18, margin: '6px 0 0 0' }}>
                {question.options.map((option, index) => (
                  <li
                    key={index}
                    style={{
                      background: index === question.correctOption ? darkTheme.correct : darkTheme.optionBg,
                      color: index === question.correctOption ? '#fff' : darkTheme.textPrimary,
                      borderRadius: 8,
                      margin: '4px 0',
                      padding: '6px 12px',
                      border: `1px solid ${darkTheme.optionBorder}`,
                      fontWeight: index === question.correctOption ? 700 : 500,
                      letterSpacing: 0.2
                    }}
                  >
                    {index + 1}. {option} {index === question.correctOption && <span style={{ marginLeft: 8 }}>(Correct)</span>}
                  </li>
                ))}
              </ul>
            </div>
            <p style={{ marginTop: 10, color: darkTheme.accent }}>
              <strong>Topic Tags:</strong> {question.topicTags && question.topicTags.join(', ')}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionList;
