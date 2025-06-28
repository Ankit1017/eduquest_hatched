import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './PastAttemptStyles';
import AttemptsList from './AttemptsList';
import AttemptReport from './AttemptReport';
import { host } from '../../config';

const PastAttempts = ({ userId }) => {
  const [attempts, setAttempts] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 600);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 600);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (userId) fetchAttempts();
    // eslint-disable-next-line
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
    <div style={styles.homePageContainer(isMobile)}>
      <h2 style={styles.header(isMobile)}>📚 Past Attempts</h2>
      {loading && <div style={styles.loading(isMobile)}>Loading Insights...</div>}
      {!selectedReport ? (
        <AttemptsList
          attempts={attempts}
          onSelect={handleShowReport}
          loading={loading}
          isMobile={isMobile}
        />
      ) : (
        <AttemptReport
          report={selectedReport}
          onBack={() => setSelectedReport(null)}
          isMobile={isMobile}
        />
      )}
    </div>
  );
};

export default PastAttempts;
