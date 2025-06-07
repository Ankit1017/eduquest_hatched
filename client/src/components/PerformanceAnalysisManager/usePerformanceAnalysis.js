import { useState } from 'react';

export const usePerformanceAnalysis = (performance) => {
  const [sortOrder, setSortOrder] = useState('highToLow');

  const sortedTopics = [...performance.topicAnalysis].sort((a, b) =>
    sortOrder === 'highToLow' ? b.accuracy - a.accuracy : a.accuracy - b.accuracy
  );

  return {
    sortOrder,
    setSortOrder,
    sortedTopics
  };
};
