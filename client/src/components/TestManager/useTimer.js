import { useEffect } from 'react';
import { useTest } from './TestContext';
import { ACTIONS } from './testReducer';

export default function useTimer() {
  const { state, dispatch } = useTest();

  useEffect(() => {
    let interval;
    if (state.testExecution.isTimerRunning && state.testExecution.timer > 0) {
      interval = setInterval(() => {
        dispatch({ type: ACTIONS.TICK_TIMER });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [state.testExecution.isTimerRunning, state.testExecution.timer]);

  const startTimer = (seconds) => {
    dispatch({ type: ACTIONS.START_TIMER, payload: seconds });
  };

  const stopTimer = () => {
    dispatch({ type: ACTIONS.STOP_TIMER });
  };

  return { startTimer, stopTimer };
}
