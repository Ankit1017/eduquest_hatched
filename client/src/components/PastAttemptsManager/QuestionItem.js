import React from 'react';
import styles from './PastAttemptStyles';

const QuestionItem = ({ question, index, isMobile }) => {
  const correctIdx = parseInt(question.correctAnswer, 10);
  const userIdx = parseInt(question.userAnswer, 10);
  const isAttempted = !isNaN(userIdx);

  return (
    <li style={{
      marginBottom: isMobile ? '16px' : '24px',
      paddingBottom: isMobile ? '10px' : '16px',
      borderBottom: '1px solid rgba(255,255,255,0.06)'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: isMobile ? '8px' : '12px',
        flexWrap: 'wrap'
      }}>
        <span style={{ color: '#90caf9', fontWeight: 600 }}>Q{index + 1}</span>
        <span style={{
          marginLeft: '12px',
          flex: 1,
          color: '#e0e0e0',
          fontSize: isMobile ? '0.98em' : '1em'
        }}>
          {question.question}
        </span>

        {question.isCorrect && (
          <span style={styles.badge('#4caf50', isMobile)}>Correct</span>
        )}
        {!question.isCorrect && isAttempted && (
          <span style={styles.badge('#f44336', isMobile)}>Incorrect</span>
        )}
        {!isAttempted && (
          <span style={styles.badge('#666', isMobile)}>Unattempted</span>
        )}
      </div>

      <div style={{ marginLeft: '8px' }}>
        {question.options.map((opt, i) => {
          const isCorrect = i === correctIdx;
          const isSelected = i === userIdx && isAttempted;

          return (
            <div key={i} style={styles.option(isCorrect, isSelected, isMobile)}>
              <span style={{ width: '24px', textAlign: 'center' }}>
                {String.fromCharCode(65 + i)}.
              </span>
              {opt}
              {isCorrect && <span style={{ marginLeft: 'auto' }}>✅</span>}
              {isSelected && !isCorrect && <span style={{ marginLeft: 'auto' }}>❌</span>}
            </div>
          );
        })}
      </div>
    </li>
  );
};

export default QuestionItem;
