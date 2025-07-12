// userPerformanceApi.js
import { useApi } from '../context/ApiContext';

/**
 * User Performance API hooks
 */
export const useUserPerformanceApi = () => {
  const { get } = useApi();

  const fetchUserPerformance = async (userId) => {
    if (!userId) return null;
    try {
      return await get(`/api/user-performance/${userId}`);
    } catch (error) {
      console.error('Error fetching user performance:', error);
      return null;
    }
  };

  const fetchUserTopicPerformance = async (userId, topic) => {
    if (!userId || !topic) return null;
    try {
      return await get(`/api/user-performance/${userId}/${topic}`);
    } catch (error) {
      console.error('Error fetching user topic performance:', error);
      return null;
    }
  };

  return { fetchUserPerformance, fetchUserTopicPerformance };
};
