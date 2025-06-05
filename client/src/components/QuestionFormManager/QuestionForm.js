// QuestionForm.jsx
// Main question form with dark theme and modular logic

import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './QuestionFormStyles';
import OptionInput from './OptionInput';
import {Navbar} from "../NavbarManager";
import {host} from "../../config";
import {AuthContext} from "../../context/AuthContext";

/**
 * QuestionForm
 * - Only accessible by admins
 * - Allows adding a question with options and correct answer
 * - Generalized, themed, and modular
 */
const QuestionForm = () => {
  const { user } = useContext(AuthContext);
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctOption, setCorrectOption] = useState(0);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  // Only allow admins
  useEffect(() => {
    if (!user || user.isAdmin === false) {
      navigate('/');
    }
  }, [user, navigate]);

  // Handle option value change
  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    const questionData = {
      question,
      authorId: user._id,
      options,
      correctOption
    };

    try {
      await axios.post(`${host}/api/questions`, questionData, {
        headers: { Authorization: `Bearer ${user._id}` }
      });
      setSuccessMsg('Question added successfully!');
      setQuestion('');
      setOptions(['', '', '', '']);
      setCorrectOption(0);
    } catch (err) {
      setErrorMsg('Failed to add question. Please try again.');
    }
    setLoading(false);
  };

  return (
    <>
    <Navbar />
    <div style={styles.card}>
      <h2 style={styles.header}>Add New Question</h2>
      <form onSubmit={handleSubmit}>
        <label style={styles.label} htmlFor="question">Question</label>
        <textarea
          id="question"
          value={question}
          onChange={e => setQuestion(e.target.value)}
          placeholder="Enter your question"
          required
          style={{ ...styles.input, ...styles.textarea }}
        />
        <div>
          <label style={styles.label}>Options</label>
          {options.map((option, index) => (
            <OptionInput
              key={index}
              index={index}
              value={option}
              onChange={handleOptionChange}
            />
          ))}
        </div>
        <label style={styles.label} htmlFor="correctOption">Correct Option</label>
        <select
          id="correctOption"
          value={correctOption}
          onChange={e => setCorrectOption(Number(e.target.value))}
          style={styles.select}
        >
          {options.map((_, idx) => (
            <option key={idx} value={idx}>{`Option ${idx + 1}`}</option>
          ))}
        </select>
        <button
          type="submit"
          style={loading ? { ...styles.button, ...styles.buttonDisabled } : styles.button}
          disabled={loading}
        >
          {loading ? 'Adding...' : 'Add Question'}
        </button>
      </form>
      {successMsg && <div style={styles.msgSuccess}>{successMsg}</div>}
      {errorMsg && <div style={styles.msgError}>{errorMsg}</div>}
    </div>
    </>
  );
};

export default QuestionForm;
