import React from 'react';
import { Chart } from "react-google-charts";

// Dark theme palette for inline elements
const darkTheme = {
  accent: "#90caf9",
  score: "#64b5f6",
  correct: "#43a047",
  incorrect: "#e53935",
  unattempted: "#bdbdbd",
  text: "#e3f2fd",
  cardBg: "#181b22"
};

const ScoreSummary = ({ report }) => (
    <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        marginBottom: 30,
        color: darkTheme.text
    }}>
        <div style={{ flex: '1 1 220px', minWidth: 220 }}>
            <div style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: 6 }}>
                <span style={{ color: darkTheme.score }}>Score:</span> {report.score} / {report.total}
                <span style={{
                    marginLeft: 10,
                    color: report.score / report.total >= 0.7 ? darkTheme.correct : darkTheme.incorrect,
                    fontWeight: 700,
                    fontSize: '1.1rem'
                }}>
                    ({((report.score / report.total) * 100).toFixed(1)}%)
                </span>
            </div>
            <div style={{ margin: '8px 0', fontSize: '1.05rem' }}>
                <b>Total Time Taken:</b> {report.timeTaken ? `${Math.floor(report.timeTaken/60)}m ${report.timeTaken%60}s` : 'N/A'}
            </div>
            <div style={{ margin: '8px 0', fontSize: '1.05rem' }}>
                <b>Avg. Time per Question:</b> {report.avgTimePerQ ? `${report.avgTimePerQ.toFixed(1)}s` : 'N/A'}
            </div>
        </div>
        <div style={{ flex: '1 1 320px', minWidth: 280, textAlign: 'center' }}>
            <div style={{ fontWeight: 600, marginBottom: 8, fontSize: '1.1rem', color: darkTheme.accent }}>
                Your Performance
            </div>
            <Chart
                chartType="PieChart"
                data={[
                    ['Status', 'Count'],
                    ['Correct', report.score],
                    ['Incorrect', report.total - report.score - (report.unattempted || 0)],
                    ['Unattempted', report.unattempted || 0]
                ]}
                options={{
                    pieHole: 0.45,
                    backgroundColor: darkTheme.cardBg,
                    slices: {
                        0: { color: darkTheme.correct },
                        1: { color: darkTheme.incorrect },
                        2: { color: darkTheme.unattempted }
                    },
                    legend: {
                        position: 'bottom',
                        textStyle: { color: darkTheme.text, fontSize: 14 }
                    },
                    chartArea: { width: '90%', height: '80%' },
                    fontName: 'inherit',
                }}
                width={'100%'}
                height={'220px'}
            />
        </div>
    </div>
);

export default ScoreSummary;
