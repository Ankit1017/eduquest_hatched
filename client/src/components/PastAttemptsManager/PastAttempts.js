// PastAttempts.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './PastAttemptStyles';
import AttemptsList from './AttemptsList';
import AttemptReport from './AttemptReport';
import { host } from '../../config'

const PastAttempts = ({ userId }) => {
  const [attempts, setAttempts] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userId) fetchAttempts();
  }, [userId]);

  const fetchAttempts = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${host}/api/reports/${userId}`);
      setAttempts(res.data);
    } catch (error) {
      console.error('Failed to fetch attempts:', error);
    }
    setLoading(false);
  };

  const handleShowReport = async (reportId) => {
    setLoading(true);
    try {
      const res = await axios.get(`${host}/api/reports/${userId}/${reportId}`);
      setSelectedReport(res.data);
    } catch (error) {
      console.error('Failed to fetch report:', error);
    }
    setLoading(false);
  };

  return (
    <div style={styles.homePageContainer}>
      <h2 style={styles.header}>📚 Past Attempts</h2>

      {loading && <div style={styles.loading}>Loading Insights...</div>}

      {!selectedReport ? (
        <AttemptsList
          attempts={attempts}
          onSelect={handleShowReport}
          loading={loading}
        />
      ) : (
        <AttemptReport
          report={selectedReport}
          onBack={() => setSelectedReport(null)}
        />
      )}
    </div>
  );
};

export default PastAttempts;
