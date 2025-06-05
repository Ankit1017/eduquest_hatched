// IndividualTopicAnalysis.jsx
// The main modal component for displaying topic-wise answer analysis

import React from 'react';
import styles from './styles';
import QuestionCard from './QuestionCard';

/**
 * @param {function} setHasIndividualTopicData - Function to close the modal
 * @param {Array} correctAnswers - Array of correct answer objects
 * @param {Array} incorrectAnswers - Array of incorrect answer objects
 * @param {string} indiTopic - The topic being analyzed
 */
const IndividualTopicAnalysis = ({
  setHasIndividualTopicData,
  correctAnswers,
  incorrectAnswers,
  indiTopic
}) => (
  <div style={styles.overlay}>
    <div style={styles.modal}>
      {/* Close Button */}
      <button
        style={styles.closeBtn}
        title="Close"
        onClick={() => setHasIndividualTopicData(false)}
      >
        ×
      </button>
      {/* Modal Title */}
      <h2 style={{ textAlign: 'center', color: '#1976d2', marginBottom: 30 }}>
        Topic Analysis - {indiTopic}
      </h2>
      <div style={styles.flexContainer}>
        {/* Correct Answers Column */}
        <div style={styles.column}>
          <h3 style={{ textAlign: 'center', color: '#388e3c' }}>
            ✅ Correct Answers ({correctAnswers.length})
          </h3>
          {correctAnswers.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#888', marginTop: 30 }}>
              No correct answers for this topic.
            </p>
          ) : (
            correctAnswers.map((item, i) => (
              <QuestionCard
                key={i}
                question={item.questionId.question}
                author={item.questionId.authorId}
                correctOption={item.questionId.correctOption}
                options={item.questionId.options}
                topics={item.topics}
                isCorrect={true}
              />
            ))
          )}
        </div>
        {/* Incorrect Answers Column */}
        <div style={styles.column}>
          <h3 style={{ textAlign: 'center', color: '#d32f2f' }}>
            ❌ Incorrect Answers ({incorrectAnswers.length})
          </h3>
          {incorrectAnswers.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#888', marginTop: 30 }}>
              No incorrect answers for this topic.
            </p>
          ) : (
            incorrectAnswers.map((item, i) => (
              <QuestionCard
                key={i}
                question={item.questionId.question}
                author={item.questionId.authorId}
                correctOption={item.questionId.correctOption}
                options={item.questionId.options}
                topics={item.topics}
                selectedOption={item.selectedOption}
                isCorrect={false}
              />
            ))
          )}
        </div>
      </div>
    </div>
  </div>
);

export default IndividualTopicAnalysis;
