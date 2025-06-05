import React, { createContext, useContext, useReducer } from 'react';
import testReducer from './testReducer';

const initialState = {
  testConfig: {
    selectedTags: [],
    searchQuery: '',
    sortOrder: 'highToLow'
  },
  testExecution: {
    questions: [],
    userAnswers: {},
    currentQuestion: 0,
    timer: 0,
    isTimerRunning: false,
    startTime: null,
    endTime: null
  },
  results: {
    report: null,
    performance: null
  },
  uiState: {
    isLoading: false,
    isSubmitting: false,
    error: '',
    showTest: false,
    reviewMode: false
  }
};

const TestContext = createContext();

export const TestProvider = ({ children }) => {
  const [state, dispatch] = useReducer(testReducer, initialState);

  return (
    <TestContext.Provider value={{ state, dispatch }}>
      {children}
    </TestContext.Provider>
  );
};

export const useTest = () => useContext(TestContext);
