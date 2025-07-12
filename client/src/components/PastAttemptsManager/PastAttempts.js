import React, { useEffect, useState, useCallback } from 'react';
import styles from './PastAttemptStyles';
import AttemptsList from './AttemptsList';
import AttemptReport from './AttemptReport';
import { usePastAttemptsApi } from '../../api';

const PastAttempts = ({ userId }) => {
  const [attempts, setAttempts] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 600);

  const { fetchAttempts, fetchAttemptReport } = usePastAttemptsApi();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 600);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const loadAttempts = useCallback(async () => {
    if (!userId) return;
    setLoading(true);
    const data = await fetchAttempts(userId);
    setAttempts(data);
    setLoading(false);
  }, [userId, fetchAttempts]);

  useEffect(() => {
    if (userId) loadAttempts();
  }, [userId, loadAttempts]);

  const handleShowReport = async (reportId) => {
    if (!userId || !reportId) return;
    setLoading(true);
    const data = await fetchAttemptReport(userId, reportId);
    setSelectedReport(data);
    setLoading(false);
  };

  return (
    <div style={styles.homePageContainer(isMobile)}>
      <h2 style={styles.header(isMobile)}>Past Attempts</h2>
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
