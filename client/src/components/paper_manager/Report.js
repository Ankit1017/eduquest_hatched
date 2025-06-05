import React, { useState } from 'react';
import { cardStyle, buttonStyle } from './styles';
import ScoreSummary from './report_manager/ScoreSummary';
import QuestionBreakdown from './report_manager/QuestionBreakdown';
import TopicMastery from './report_manager/TopicMastery';

// Dark theme palette for inline elements
const darkTheme = {
  borderAccent: "#1976d2",
  cardBg: "#181b22",
  cardShadow: "0 8px 32px rgba(25,118,210,0.18)",
  header: "#90caf9",
  button: "linear-gradient(90deg, #1976d2 0%, #64b5f6 100%)",
  buttonText: "#fff"
};

const QUESTIONS_PER_PAGE = 5;
const TOPICS_PER_PAGE = 4;

const Report = ({
    report,
    reviewMode,
    setReviewMode,
    setReport,
    setQuestions,
    setUserAnswers,
    setCurrentQuestion,
}) => {
    const [questionPage, setQuestionPage] = useState(0);
    const [topicPage, setTopicPage] = useState(0);

    return (
        <div
            style={{
                ...cardStyle,
                borderLeft: `5px solid ${darkTheme.borderAccent}`,
                marginTop: 32,
                boxShadow: darkTheme.cardShadow,
                padding: '40px 32px',
                borderRadius: 18,
                background: darkTheme.cardBg,
                color: darkTheme.buttonText
            }}
        >
            <h2
                style={{
                    color: darkTheme.header,
                    fontSize: '2rem',
                    marginBottom: 14,
                    letterSpacing: 1,
                    fontWeight: 700
                }}
            >
                🎉 Test Report
            </h2>
            <ScoreSummary report={report} />
            <QuestionBreakdown
                report={report}
                reviewMode={reviewMode}
                questionPage={questionPage}
                setQuestionPage={setQuestionPage}
                QUESTIONS_PER_PAGE={QUESTIONS_PER_PAGE}
            />
            <TopicMastery
                report={report}
                topicPage={topicPage}
                setTopicPage={setTopicPage}
                TOPICS_PER_PAGE={TOPICS_PER_PAGE}
            />
            <div style={{ marginTop: 32 }}>
                <button
                    style={{
                        ...buttonStyle,
                        marginRight: 10,
                        background: darkTheme.button,
                        color: darkTheme.buttonText
                    }}
                    onClick={() => {
                        setReport(null);
                        setQuestions([]);
                        setUserAnswers({});
                        setCurrentQuestion(0);
                    }}
                >
                    Retake Test
                </button>
                <button
                    style={{
                        ...buttonStyle,
                        background: darkTheme.button,
                        color: darkTheme.buttonText
                    }}
                    onClick={() => setReviewMode(r => !r)}
                >
                    {reviewMode ? "Show All Questions" : "Review Wrong Attempts"}
                </button>
            </div>
        </div>
    );
};

export default Report;
