// AttemptReport.jsx
import React from 'react';
import QuestionItem from './QuestionItem';
import styles from './PastAttemptStyles';

const AttemptReport = ({ report, onBack }) => (
  <div style={styles.card}>
    <button style={styles.backButton} onClick={onBack}>
      ← Back to Attempts
    </button>

    <div style={{ margin: '24px 0' }}>
      <div style={{ display: 'flex', gap: '32px', marginBottom: '24px' }}>
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

      <h3 style={{ color: '#90caf9', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '12px' }}>
        Question Breakdown
      </h3>

      <ul style={{ paddingLeft: 0, marginTop: '16px' }}>
        {report.questions.map((q, idx) => (
          <QuestionItem
            key={q._id}
            question={q}
            index={idx}
          />
        ))}
      </ul>
    </div>
  </div>
);

export default AttemptReport;
