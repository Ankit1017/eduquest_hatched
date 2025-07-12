// pastAttemptsApi.js
import { useApi } from '../context/ApiContext';

/**
 * Past Attempts API hooks
 */
export const usePastAttemptsApi = () => {
  const { get } = useApi();

  const fetchAttempts = async (userId) => {
    if (!userId) return [];
    try {
      const data = await get(`/api/reports/${userId}`);
      if (!data || !Array.isArray(data)) {
        console.error("Invalid attempts data received:", data);
        return [];
      }
      return data;
    } catch (error) {
      console.error('Failed to fetch attempts:', error);
      return [];
    }
  };

  const fetchAttemptReport = async (userId, reportId) => {
    if (!userId || !reportId) return null;
    try {
      const data = await get(`/api/reports/${userId}/${reportId}`);
      if (!data) {
        console.error("Invalid report data received:", data);
        return null;
      }
      return data;
    } catch (error) {
      console.error('Failed to fetch report:', error);
      return null;
    }
  };

  return { fetchAttempts, fetchAttemptReport };
};
