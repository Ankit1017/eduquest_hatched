// QuestionCard.jsx
// Displays a single question, its options, and associated topics

import React from 'react';
import styles from './styles';
import OptionList from './OptionList';
import TagList from './TagList';

/**
 * @param {string} question - The question text
 * @param {string} author - Author of the question
 * @param {number} correctOption - Index of the correct option
 * @param {Array} options - Array of option strings
 * @param {Array} topics - Array of topic/tag strings
 * @param {number} [selectedOption] - Index of the user's selected option (if incorrect)
 * @param {boolean} isCorrect - Whether the answer was correct
 */
const QuestionCard = ({
  question,
  author,
  correctOption,
  options,
  topics,
  selectedOption,
  isCorrect
}) => (
  <div style={styles.card}>
    <div style={styles.qTitle}>Q: {question}</div>
    <div style={{ fontSize: '0.98em', marginBottom: 5 }}>
      <span style={{ color: '#888' }}>Author:</span> {author}
    </div>
    <div style={{ fontSize: '0.98em', marginBottom: 5 }}>
      <span style={{ color: '#888' }}>Correct Option:</span> {correctOption + 1}
    </div>
    {/* Show user's selection only if answer is incorrect */}
    {!isCorrect && (
      <div style={{ fontSize: '0.98em', marginBottom: 5 }}>
        <span style={{ color: '#888' }}>Your Selection:</span> {selectedOption + 1}
      </div>
    )}
    <div style={{ fontSize: '0.98em', marginBottom: 5, color: '#888' }}>All Options:</div>
    <OptionList
      options={options}
      correctIndex={correctOption}
      selectedIndex={selectedOption}
      showSelection={!isCorrect}
    />
    <div style={{ fontSize: '0.98em', marginBottom: 5, color: '#888' }}>Topics:</div>
    <TagList tags={topics} />
  </div>
);

export default QuestionCard;
