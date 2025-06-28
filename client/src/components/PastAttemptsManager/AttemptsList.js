import React from 'react';
import styles from './PastAttemptStyles';
import { format } from 'date-fns';

const formatDateTime = (dateString) => {
  const date = new Date(dateString);
  return format(date, 'd MMM yyyy, h:mm a');
};

const AttemptsList = ({ attempts, onSelect, loading, isMobile }) => (
  <div style={styles.cardStack(isMobile)}>
    {attempts.length === 0 && !loading && (
      <div style={{ textAlign: 'center', color: '#666', padding: '32px 0' }}>
        No past attempts found. 📭
      </div>
    )}

    {attempts.map((attempt) => (
      <div key={attempt._id} style={styles.attemptCard(isMobile)}>
        <div style={styles.leftCol(isMobile)}>
          <div style={styles.dateTime(isMobile)}>
            <span role="img" aria-label="calendar">📅</span>
            <span>{formatDateTime(attempt.createdAt || attempt.date)}</span>
          </div>
          <div style={styles.statsRow(isMobile)}>
            <span>
              <span style={styles.score}>Score:</span>{' '}
              <span style={{ fontWeight: 700 }}>{attempt.score}/{attempt.total}</span>
            </span>
            <span>
              <span style={styles.time}>Time:</span>{' '}
              {Math.floor(attempt.timeTaken / 60)}m {attempt.timeTaken % 60}s
            </span>
          </div>
        </div>
        <button
          onClick={() => onSelect(attempt._id)}
          style={styles.viewBtn(isMobile)}
        >
          View Attempt
        </button>
      </div>
    ))}
  </div>
);

export default AttemptsList;
