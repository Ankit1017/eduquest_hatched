// classApi.js
import { useApi } from '../context/ApiContext';

/**
 * Class Management API hooks
 */
export const useClassApi = () => {
  const { get, post } = useApi();

  const fetchClasses = async (userId, token) => {
    try {
      const data = await get(
        '/api/classes/my',
        { user: userId },
        { useCache: false, config: { headers: { Authorization: `Bearer ${token}` } } }
      );
      return data.classes || [];
    } catch (err) {
      console.error('Failed to fetch classes:', err);
      throw err;
    }
  };

  const createClass = async (classData, token) => {
    try {
      return await post(
        '/api/classes',
        classData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (err) {
      console.error('Class creation failed:', err);
      throw err;
    }
  };

  const joinClass = async (classId, user, token) => {
    try {
      return await post(
        `/api/classes/${classId}/join`,
        { user },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (err) {
      console.error('Enrollment failed:', err);
      throw err;
    }
  };

  return { fetchClasses, createClass, joinClass };
};
