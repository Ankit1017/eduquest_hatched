import React, { useState } from 'react';
import Pagination from './report_manager/Pagination';

const ITEMS_PER_PAGE = 8;

// Dark theme configuration
const darkTheme = {
  accent: "#90caf9",
  correct: "#43a047",
  warning: "#fbc02d",
  incorrect: "#e53935",
  text: "#e3f2fd",
  cardBg: "#23272f",
  border: "#31343c",
  inputBg: "#181b22",
  shadow: "0 4px 24px rgba(25,118,210,0.15)"
};

const PerformanceAnalysis = ({ performance, sortOrder, setSortOrder }) => {
    const [page, setPage] = useState(0);
    const sortedTopics = (performance.topicAnalysis || []).sort((a, b) =>
        sortOrder === 'highToLow' ? b.accuracy - a.accuracy : a.accuracy - b.accuracy
    );
    const totalPages = Math.ceil(sortedTopics.length / ITEMS_PER_PAGE);
    const visibleTopics = sortedTopics.slice(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE);

    return (
        <div style={{
            background: darkTheme.cardBg,
            borderLeft: `5px solid ${darkTheme.accent}`,
            padding: '32px 24px',
            borderRadius: 12,
            marginBottom: 32,
            color: darkTheme.text
        }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
                <h2 style={{
                    color: darkTheme.accent,
                    margin: 0,
                    fontWeight: 700,
                    fontSize: '1.5rem',
                    letterSpacing: 0.3
                }}>
                    📊 Performance Analysis
                </h2>
                <select
                    value={sortOrder}
                    onChange={e => setSortOrder(e.target.value)}
                    style={{
                        padding: '8px 16px',
                        borderRadius: 8,
                        border: `1.5px solid ${darkTheme.border}`,
                        background: darkTheme.inputBg,
                        color: darkTheme.text,
                        fontWeight: 500,
                        fontSize: '1rem',
                        cursor: 'pointer'
                    }}
                    aria-label="Sort performance"
                >
                    <option value="highToLow">High → Low</option>
                    <option value="lowToHigh">Low → High</option>
                </select>
            </div>

            {visibleTopics.length === 0 ? (
                <div style={{ color: '#607d8b', padding: 16 }}>No performance data available.</div>
            ) : (
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                    gap: 24,
                    paddingBottom: 16
                }}>
                    {visibleTopics.map((topic) => {
                        const percent = topic.accuracy;
                        let barColor = darkTheme.correct;
                        if (percent < 60) barColor = darkTheme.incorrect;
                        else if (percent < 80) barColor = darkTheme.warning;

                        return (
                            <div
                                key={topic.topic}
                                style={{
                                    background: darkTheme.cardBg,
                                    border: `1.5px solid ${darkTheme.border}`,
                                    borderRadius: 12,
                                    padding: 20,
                                    boxShadow: darkTheme.shadow
                                }}
                            >
                                <div style={{
                                    fontWeight: 700,
                                    marginBottom: 12,
                                    fontSize: '1.1rem',
                                    color: darkTheme.accent
                                }}>
                                    {topic.topic}
                                    {percent >= 90 && (
                                        <span style={{
                                            marginLeft: 12,
                                            background: 'rgba(67,160,71,0.15)',
                                            color: darkTheme.correct,
                                            borderRadius: 6,
                                            padding: '4px 12px',
                                            fontSize: '0.85em',
                                            border: `1px solid ${darkTheme.correct}`
                                        }}>Excellent</span>
                                    )}
                                    {percent < 60 && (
                                        <span style={{
                                            marginLeft: 12,
                                            background: 'rgba(229,57,53,0.15)',
                                            color: darkTheme.incorrect,
                                            borderRadius: 6,
                                            padding: '4px 12px',
                                            fontSize: '0.85em',
                                            border: `1px solid ${darkTheme.incorrect}`
                                        }}>Needs Help</span>
                                    )}
                                </div>
                                <div style={{ marginBottom: 12 }}>
                                    <span style={{ fontWeight: 500 }}>
                                        {topic.correct}/{topic.total}
                                    </span>
                                    &nbsp;(
                                    <span style={{ color: barColor, fontWeight: 700 }}>
                                        {percent.toFixed(1)}%
                                    </span>
                                    )
                                </div>
                                <div style={{
                                    background: '#181b22',
                                    borderRadius: 8,
                                    height: 14,
                                    overflow: 'hidden',
                                    border: `1px solid ${darkTheme.border}`
                                }}>
                                    <div style={{
                                        width: `${percent}%`,
                                        height: '100%',
                                        background: barColor,
                                        transition: 'width 0.4s'
                                    }} />
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {totalPages > 1 && (
                <Pagination
                    page={page}
                    setPage={setPage}
                    totalPages={totalPages}
                />
            )}
        </div>
    );
};

export default PerformanceAnalysis;
