import React, { useState, useEffect } from 'react';
import styles from './styles';
import QuestionCard from './QuestionCard';

const IndividualTopicAnalysis = ({
  setHasIndividualTopicData,
  correctAnswers,
  incorrectAnswers,
  indiTopic
}) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 600);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 600);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div style={styles.overlay}>
      <div style={styles.modal(isMobile)}>
        {/* Modal Header: Topic Name & Close Button */}
        <div style={styles.modalHeader(isMobile)}>
          <span style={styles.topicTitle(isMobile)}>
            {indiTopic}
          </span>
          <button
            style={styles.closeBtn(isMobile)}
            title="Close"
            onClick={() => setHasIndividualTopicData(false)}
          >
            ×
          </button>
        </div>
        <div style={styles.flexContainer(isMobile)}>
          {/* Correct Answers Column */}
          <div style={styles.column(isMobile)}>
            <h3 style={{ textAlign: 'center', color: '#388e3c', fontSize: isMobile ? '1.1em' : '1.2em' }}>
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
                  isMobile={isMobile}
                />
              ))
            )}
          </div>
          {/* Incorrect Answers Column */}
          <div style={styles.column(isMobile)}>
            <h3 style={{ textAlign: 'center', color: '#d32f2f', fontSize: isMobile ? '1.1em' : '1.2em' }}>
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
                  isMobile={isMobile}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndividualTopicAnalysis;
