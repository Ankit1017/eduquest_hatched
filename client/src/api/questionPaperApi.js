// questionPaperApi.js
import { useApi } from '../context/ApiContext';

/**
 * Question Paper API hooks
 */
export const useQuestionPaperApi = () => {
  const { get, post, clearCache } = useApi();

  const fetchTags = async () => {
    try {
      return await get('/api/tags');
    } catch (err) {
      console.error('Could not load tags', err);
      throw err;
    }
  };

  const fetchQuestions = async (tags) => {
    try {
      return await post('/api/question-paper', { tags });
    } catch (err) {
      console.error('Error fetching questions', err);
      throw err;
    }
  };

  const submitAnswers = async ({ userId, userAnswers, startTime }) => {
    try {
      return await post('/api/submit-answers', { userId, userAnswers, startTime });
    } catch (err) {
      console.error('Error submitting answers', err);
      throw err;
    }
  };

  const fetchUserPerformance = async (userId) => {
    try {
      return await get(`/api/user-performance/${userId}`);
    } catch (err) {
      console.error('Error fetching user performance', err);
      throw err;
    }
  };

  return {
    fetchTags,
    fetchQuestions,
    submitAnswers,
    fetchUserPerformance,
    clearCache,
  };
};
