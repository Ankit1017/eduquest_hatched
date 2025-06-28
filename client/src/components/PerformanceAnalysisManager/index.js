import React, { useRef, useEffect, useState } from 'react';
import { Chart } from "react-google-charts";
import Slider from "react-slick";
import { usePerformanceAnalysis } from './usePerformanceAnalysis';
import { styles } from './PerformanceAnalysisStyles';

export const PerformanceAnalysis = ({ handleCardClick, performance, theme }) => {
  const { sortOrder, setSortOrder, sortedTopics } = usePerformanceAnalysis(performance);
  const sliderRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Enhanced wheel event handler
  useEffect(() => {
    const sliderNode = sliderRef.current;
    if (!sliderNode || isMobile) return;

    const handleWheel = (e) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        e.preventDefault();
        e.deltaX > 0 ? sliderNode.slickNext() : sliderNode.slickPrev();
      }
    };

    const parentDiv = sliderNode.innerSlider?.list;
    if (parentDiv) parentDiv.addEventListener('wheel', handleWheel, { passive: false });

    return () => parentDiv?.removeEventListener('wheel', handleWheel);
  }, [sortedTopics.length, isMobile]);

  // Dynamic slider settings with sortedTopics reference
  const getSliderSettings = () => ({
    ...styles.sliderSettings,
    infinite: sortedTopics.length > 3, // Now properly referenced in component
    centerMode: isMobile,
    centerPadding: isMobile ? '10px' : '0px',
    slidesToShow: isMobile ? 1 : Math.min(3, sortedTopics.length)
  });

  // Responsive chart options
  const getChartOptions = () => ({
    pieHole: 0.5,
    slices: { 0: { color: '#43a047' }, 1: { color: '#e53935' } },
    legend: {
      position: 'bottom',
      textStyle: {
        color: theme.textPrimary,
        fontSize: isMobile ? 10 : 13
      }
    },
    chartArea: { 
      width: '90%', 
      height: isMobile ? '65%' : '75%' 
    },
    backgroundColor: 'transparent',
    tooltip: {
      isHtml: true,
      textStyle: { color: theme.textPrimary, fontSize: isMobile ? 10 : 14 }
    },
    pieSliceTextStyle: {
      color: 'white',
      fontSize: isMobile ? 8 : 10,
      fontWeight: 'bold'
    }
  });

  return (
    <div style={styles.homePageContainer(isMobile)}>
      <div style={styles.headerContainer(isMobile)}>
        <h2 style={styles.title(theme, isMobile)}>📊 Performance Analysis</h2>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          style={styles.sortSelect(theme, isMobile)}
          aria-label="Sort performance by accuracy"
        >
          <option value="highToLow">High → Low Performance</option>
          <option value="lowToHigh">Low → High Performance</option>
        </select>
      </div>

      <div style={styles.sliderContainer(isMobile)}>
        <Slider ref={sliderRef} {...getSliderSettings()}>
          {sortedTopics.map((topic, indx) => (
            <div key={indx}>
              <div
                style={styles.card(theme, isMobile)}
                onClick={() => handleCardClick(topic.topic, performance.userId)}
                onTouchStart={() => {}}
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
                  options={getChartOptions()}
                  width="100%"
                  height={isMobile ? "140px" : "200px"}
                />
                <div style={styles.label(theme, isMobile)}>Topic:</div>
                <div style={styles.value(theme, isMobile)}>{topic.topic}</div>
                <div style={styles.label(theme, isMobile)}>Accuracy:</div>
                <div style={styles.value(theme, isMobile)}>{(topic.accuracy).toFixed(2)}%</div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};
