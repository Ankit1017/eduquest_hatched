import React from 'react';
import styles from './styles';
import OptionList from './OptionList';
import TagList from './TagList';

const QuestionCard = ({
  question,
  author,
  correctOption,
  options,
  topics,
  selectedOption,
  isCorrect,
  isMobile
}) => (
  <div style={styles.card(isMobile)}>
    <div style={styles.qTitle}>Q: {question}</div>
    <div style={{ fontSize: '0.98em', marginBottom: 5 }}>
      <span style={{ color: '#888' }}>Author:</span> {author}
    </div>
    <div style={{ fontSize: '0.98em', marginBottom: 5 }}>
      <span style={{ color: '#888' }}>Correct Option:</span> {correctOption + 1}
    </div>
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
    <TagList tags={topics} isMobile={isMobile} />
  </div>
);

export default QuestionCard;
