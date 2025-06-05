export const ACTIONS = {
  SET_TAGS: 'SET_TAGS',
  SET_QUESTIONS: 'SET_QUESTIONS',
  UPDATE_ANSWER: 'UPDATE_ANSWER',
  // Add all other actions here
};

export default function testReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_TAGS:
      return {
        ...state,
        testConfig: {
          ...state.testConfig,
          selectedTags: action.payload
        }
      };
    case ACTIONS.SET_QUESTIONS:
      return {
        ...state,
        testExecution: {
          ...state.testExecution,
          questions: action.payload
        }
      };
    case ACTIONS.UPDATE_ANSWER:
      return {
        ...state,
        testExecution: {
          ...state.testExecution,
          userAnswers: {
            ...state.testExecution.userAnswers,
            [action.payload.questionId]: action.payload.answerIndex
          }
        }
      };
    // Handle all other state transitions
    default:
      return state;
  }
}
