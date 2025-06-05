import { useEffect } from 'react';
import { useTest } from './TestContext';
import { ACTIONS } from './testReducer';
import useQuestionFetcher from './useQuestionFetcher';
import useTimer from './useTimer';

export const useTestManager = () => {
  const { state, dispatch } = useTest();
  const { fetchQuestions } = useQuestionFetcher();
  const { startTimer, stopTimer } = useTimer();

  const handleTagChange = (tag) => {
    dispatch({
      type: ACTIONS.SET_TAGS,
      payload: state.testConfig.selectedTags.includes(tag)
        ? state.testConfig.selectedTags.filter(t => t !== tag)
        : [...state.testConfig.selectedTags, tag]
    });
  };

  const handleFetchQuestions = async () => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: true });
    try {
      const questions = await fetchQuestions(state.testConfig.selectedTags);
      dispatch({ type: ACTIONS.SET_QUESTIONS, payload: questions });
    } catch (error) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: 'Error fetching questions' });
    }
    dispatch({ type: ACTIONS.SET_LOADING, payload: false });
  };

  // Add all other business logic here

  return {
    state,
    actions: {
      handleTagChange,
      handleFetchQuestions,
      startTimer: (minutes) => startTimer(minutes * 60),
      stopTimer,
      // Expose other actions
    }
  };
};
