// AttemptsList.jsx
import React from 'react';
import styles from './PastAttemptStyles';

const AttemptsList = ({ attempts, onSelect, loading }) => (
  <div>
    {attempts.length === 0 && !loading && (
      <div style={{ textAlign: 'center', color: '#666', padding: '32px 0' }}>
        No past attempts found. 📭
      </div>
    )}

    <ul style={{ listStyle: 'none', padding: 0 }}>
      {attempts.map((attempt) => (
        <li key={attempt._id}>
          <div style={styles.attemptCard}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontSize: '1.1rem' }}>
                <span role="img" aria-label="calendar">📅</span>{' '}
                {new Date(attempt.createdAt || attempt.date).toLocaleString()}
              </div>
              <button
                onClick={() => onSelect(attempt._id)}
                style={{
                  background: 'linear-gradient(45deg, #1976d2, #2196f3)',
                  color: '#fff',
                  padding: '8px 24px',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: 600,
                  transition: 'transform 0.2s',
                  ':hover': {
                    transform: 'scale(1.02)'
                  }
                }}
              >
                View Attempt
              </button>
            </div>

            <div style={{ marginTop: '16px', display: 'flex', gap: '24px' }}>
              <div>
                <span style={{ color: '#90caf9' }}>Score:</span>{' '}
                <span style={{ fontWeight: 700 }}>
                  {attempt.score}/{attempt.total}
                </span>
              </div>
              <div>
                <span style={{ color: '#90caf9' }}>Time:</span>{' '}
                {Math.floor(attempt.timeTaken / 60)}m {attempt.timeTaken % 60}s
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  </div>
);

export default AttemptsList;
