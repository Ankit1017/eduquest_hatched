import React from 'react';
import QuestionItem from './QuestionItem';
import styles from './PastAttemptStyles';

const AttemptReport = ({ report, onBack, isMobile }) => (
  <div style={styles.card(isMobile)}>
    <button style={styles.backButton(isMobile)} onClick={onBack}>
      ← Back to Attempts
    </button>

    <div style={{ margin: isMobile ? '14px 0' : '24px 0' }}>
      <div style={{
        display: 'flex',
        gap: isMobile ? '16px' : '32px',
        marginBottom: isMobile ? '14px' : '24px',
        flexWrap: 'wrap'
      }}>
        <div>
          <span style={{ color: '#90caf9' }}>Score:</span>{' '}
          <span style={{ color: '#4caf50', fontWeight: 700 }}>
            {report.score}/{report.total}
          </span>
        </div>
        <div>
          <span style={{ color: '#90caf9' }}>Time Taken:</span>{' '}
          {Math.floor(report.timeTaken / 60)}m {report.timeTaken % 60}s
        </div>
      </div>

      <h3 style={{
        color: '#90caf9',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        paddingBottom: isMobile ? '8px' : '12px',
        fontSize: isMobile ? '1.1em' : '1.2em'
      }}>
        Question Breakdown
      </h3>

      <ul style={{ paddingLeft: 0, marginTop: isMobile ? '10px' : '16px' }}>
        {report.questions.map((q, idx) => (
          <QuestionItem
            key={q._id}
            question={q}
            index={idx}
            isMobile={isMobile}
          />
        ))}
      </ul>
    </div>
  </div>
);

export default AttemptReport;
