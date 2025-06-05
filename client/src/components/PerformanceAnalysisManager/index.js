// PerformanceAnalysisManager/index.js
import React, { useRef, useEffect } from 'react';
import { Chart } from "react-google-charts";
import Slider from "react-slick";
import { usePerformanceAnalysis } from './usePerformanceAnalysis';
import { styles } from './PerformanceAnalysisStyles';

export const PerformanceAnalysis = ({ handleCardClick, performance, theme }) => {
  const { sortOrder, setSortOrder, sortedTopics } = usePerformanceAnalysis(performance);
  const sliderRef = useRef(null);

  // Wheel event handler for slider (unchanged logic)
  useEffect(() => {
    const sliderNode = sliderRef.current;
    if (!sliderNode) return;

    const handleWheel = (e) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        e.preventDefault();
        e.deltaX > 0 ? sliderNode.slickNext() : sliderNode.slickPrev();
      }
    };

    const parentDiv = sliderNode.innerSlider?.list;
    if (parentDiv) parentDiv.addEventListener('wheel', handleWheel, { passive: false });

    return () => parentDiv?.removeEventListener('wheel', handleWheel);
  }, [sortedTopics.length]);

  return (
    <>
      <div style={styles.headerContainer}>
        <h2 style={styles.title(theme)}>📊 Performance Analysis</h2>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          style={styles.sortSelect(theme)}
          aria-label="Sort performance by accuracy"
        >
          <option value="highToLow">High → Low Performance</option>
          <option value="lowToHigh">Low → High Performance</option>
        </select>
      </div>

      <div style={styles.sliderContainer}>
        <Slider ref={sliderRef} {...styles.sliderSettings}>
          {sortedTopics.map((topic, indx) => (
            <div key={indx}>
              <div
                style={styles.card(theme)}
                onClick={() => handleCardClick(topic.topic, performance.userId)}
                tabIndex={0}
                role="button"
                aria-label={`View details for ${topic.topic}`}
              >
                <Chart
                  chartType="PieChart"
                  data={[
                    ["AnswerStatus", "Total"],
                    ["Correct", topic.correct],
                    ["Incorrect", topic.total - topic.correct]
                  ]}
                  options={{
                    pieHole: 0.5,
                    slices: { 0: { color: '#43a047' }, 1: { color: '#e53935' } },
                    legend: {
                      position: 'bottom',
                      textStyle: {
                        color: theme.textPrimary,
                        fontSize: 14
                      }
                    },
                    chartArea: { width: '90%', height: '80%' },
                    backgroundColor: theme.cardBackground,
                    tooltip: {
                      isHtml: true,
                      textStyle: { color: theme.textPrimary }
                    }
                  }}
                  width="100%"
                  height="180px"
                />
                <div style={styles.label(theme)}>Topic:</div>
                <div style={styles.value(theme)}>{topic.topic}</div>
                <div style={styles.label(theme)}>Accuracy:</div>
                <div style={styles.value(theme)}>{(topic.accuracy).toFixed(2)}%</div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
};
