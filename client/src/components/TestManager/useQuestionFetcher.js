import { useTest } from './TestContext';
import { ACTIONS } from './testReducer';
import axios from 'axios';

export default function useQuestionFetcher() {
  const { dispatch } = useTest();

  const fetchQuestions = async (tags) => {
    try {
      const response = await axios.post('/api/question-paper', { tags });
      return response.data;
    } catch (error) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: 'Fetch failed' });
      return [];
    }
  };

  return { fetchQuestions };
}
