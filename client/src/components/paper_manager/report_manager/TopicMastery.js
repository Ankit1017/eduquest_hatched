import React from 'react';
import Pagination from './Pagination';

// Dark theme palette
const darkTheme = {
  accent: "#90caf9",
  correct: "#43a047",
  warning: "#fbc02d",
  incorrect: "#e53935",
  neutral: "#bdbdbd",
  text: "#e3f2fd",
  cardBg: "#23272f",
  border: "#31343c",
  barBg: "#181b22",
  shadow: "0 2px 8px rgba(25,118,210,0.10)"
};

const TopicMastery = ({
    report,
    topicPage,
    setTopicPage,
    TOPICS_PER_PAGE
}) => {
    const topicAccuracy = report.topicAccuracy || [];
    const totalTopicPages = Math.ceil(topicAccuracy.length / TOPICS_PER_PAGE);
    const visibleTopics = topicAccuracy.slice(
        topicPage * TOPICS_PER_PAGE,
        (topicPage + 1) * TOPICS_PER_PAGE
    );

    return (
        <>
            <div style={{
                margin: '32px 0 10px 0',
                fontWeight: 700,
                fontSize: '1.1rem',
                color: darkTheme.accent
            }}>
                Topic Mastery
            </div>
            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 24,
                minHeight: 220
            }}>
                {visibleTopics.length === 0 ? (
                    <div style={{ color: darkTheme.neutral }}>No topic data available</div>
                ) : (
                    visibleTopics
                        .sort((a, b) => b.total - a.total)
                        .map(topic => {
                            const percent = topic.total > 0 ? (topic.correct / topic.total) * 100 : 0;
                            let barColor = darkTheme.correct;
                            if (percent < 60) barColor = darkTheme.incorrect;
                            else if (percent < 80) barColor = darkTheme.warning;

                            return (
                                <div
                                    key={topic.name}
                                    style={{
                                        minWidth: 220,
                                        background: darkTheme.cardBg,
                                        border: `1.5px solid ${darkTheme.border}`,
                                        borderRadius: 10,
                                        padding: 16,
                                        marginBottom: 8,
                                        flex: '1 1 220px',
                                        boxShadow: darkTheme.shadow,
                                        color: darkTheme.text
                                    }}
                                >
                                    <div style={{ fontWeight: 600, marginBottom: 6, color: darkTheme.accent }}>
                                        {topic.name}
                                        {percent >= 90 && (
                                            <span style={{
                                                marginLeft: 8,
                                                background: darkTheme.correct,
                                                color: '#fff',
                                                borderRadius: 6,
                                                padding: '2px 8px',
                                                fontSize: '0.85em'
                                            }}>Excellent</span>
                                        )}
                                        {percent < 60 && (
                                            <span style={{
                                                marginLeft: 8,
                                                background: darkTheme.incorrect,
                                                color: '#fff',
                                                borderRadius: 6,
                                                padding: '2px 8px',
                                                fontSize: '0.85em'
                                            }}>Needs Improvement</span>
                                        )}
                                    </div>
                                    <div style={{ marginBottom: 6 }}>
                                        <span style={{ fontWeight: 500 }}>
                                            {topic.correct}/{topic.total}
                                        </span>
                                        &nbsp;(
                                        <span style={{ color: barColor, fontWeight: 600 }}>
                                            {percent.toFixed(1)}%
                                        </span>
                                        )
                                    </div>
                                    <div style={{
                                        background: darkTheme.barBg,
                                        borderRadius: 6,
                                        height: 12,
                                        overflow: 'hidden',
                                        marginBottom: 2,
                                        border: `1px solid ${darkTheme.border}`
                                    }}>
                                        <div style={{
                                            width: `${percent}%`,
                                            height: '100%',
                                            background: barColor,
                                            transition: 'width 0.4s'
                                        }} />
                                    </div>
                                    <div style={{ fontSize: '0.9em', color: darkTheme.neutral }}>
                                        {percent === 100 && 'Excellent!'}
                                        {percent >= 60 && percent < 100 && 'Good, but can improve.'}
                                        {percent < 60 && 'Needs improvement.'}
                                    </div>
                                </div>
                            );
                        })
                )}
            </div>
            {totalTopicPages > 1 && (
                <Pagination
                    page={topicPage}
                    setPage={setTopicPage}
                    totalPages={totalTopicPages}
                />
            )}
        </>
    );
};

export default TopicMastery;
