import React from 'react';
import Pagination from './Pagination';

// Dark theme palette
const darkTheme = {
  accent: "#90caf9",
  correct: "#43a047",
  incorrect: "#e53935",
  neutral: "#bdbdbd",
  text: "#e3f2fd",
  background: "#181b22",
  cardBg: "#23272f",
  border: "#31343c"
};

const QuestionBreakdown = ({
    report,
    reviewMode,
    questionPage,
    setQuestionPage,
    QUESTIONS_PER_PAGE
}) => {
    const filteredQuestions = (report.questions || []).filter(
        q => !reviewMode || (!q.isCorrect && q.userAnswer !== undefined)
    );
    const totalQuestionPages = Math.ceil(filteredQuestions.length / QUESTIONS_PER_PAGE);
    const visibleQuestions = filteredQuestions.slice(
        questionPage * QUESTIONS_PER_PAGE,
        (questionPage + 1) * QUESTIONS_PER_PAGE
    );

    return (
        <>
            <div style={{
                margin: '24px 0 10px 0',
                fontWeight: 700,
                fontSize: '1.1rem',
                color: darkTheme.accent
            }}>
                {reviewMode ? "Your Wrong Attempts" : "Per-Question Breakdown"}
            </div>
            <ul style={{ paddingLeft: 0, listStyle: 'none', margin: 0 }}>
                {visibleQuestions.map((q, idx) => {
                    const isCorrect = q.isCorrect;
                    const isAttempted = q.userAnswer !== undefined;

                    return (
                        <li key={q._id || idx} style={{
                            marginBottom: 20,
                            padding: '18px 18px 12px 18px',
                            borderRadius: 10,
                            background: darkTheme.cardBg,
                            borderLeft: `5px solid ${isCorrect 
                                ? 'rgba(67,160,71,0.6)' 
                                : isAttempted 
                                ? 'rgba(229,57,53,0.6)' 
                                : 'rgba(189,189,189,0.6)'}`,
                            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                            border: `1px solid ${darkTheme.border}`
                        }}>
                            <div style={{
                                fontWeight: 600,
                                color: isCorrect
                                    ? darkTheme.correct
                                    : isAttempted
                                    ? darkTheme.incorrect
                                    : darkTheme.neutral,
                                marginBottom: 4
                            }}>
                                Q{questionPage * QUESTIONS_PER_PAGE + idx + 1}: {q.question}
                            </div>
                            <div style={{ marginLeft: 8, fontSize: '1rem' }}>
                                <div style={{ marginBottom: 6 }}>
                                    <b>Your Answer:</b>{" "}
                                    {isAttempted
                                        ? <span style={{
                                            color: isCorrect ? darkTheme.correct : darkTheme.incorrect,
                                            fontWeight: 600
                                        }}>{q.options[q.userAnswer]}</span>
                                        : <span style={{ color: darkTheme.neutral }}>Unattempted</span>}
                                </div>
                                <div style={{ marginBottom: 6 }}>
                                    <b>Correct Answer:</b>{" "}
                                    <span style={{
                                        color: darkTheme.correct,
                                        fontWeight: 600
                                    }}>
                                        {q.options[q.correctOption]}
                                    </span>
                                </div>
                                <div>
                                    {isCorrect
                                        ? <span style={{
                                            background: 'rgba(67,160,71,0.15)',
                                            color: darkTheme.correct,
                                            borderRadius: 6,
                                            padding: '4px 12px',
                                            fontWeight: 600,
                                            fontSize: '0.93em',
                                            border: `1px solid ${darkTheme.correct}`
                                        }}>Correct</span>
                                        : isAttempted
                                            ? <span style={{
                                                background: 'rgba(229,57,53,0.15)',
                                                color: darkTheme.incorrect,
                                                borderRadius: 6,
                                                padding: '4px 12px',
                                                fontWeight: 600,
                                                fontSize: '0.93em',
                                                border: `1px solid ${darkTheme.incorrect}`
                                            }}>Incorrect</span>
                                            : <span style={{
                                                background: 'rgba(189,189,189,0.15)',
                                                color: darkTheme.neutral,
                                                borderRadius: 6,
                                                padding: '4px 12px',
                                                fontWeight: 600,
                                                fontSize: '0.93em',
                                                border: `1px solid ${darkTheme.neutral}`
                                            }}>Unattempted</span>
                                    }
                                </div>
                            </div>
                        </li>
                    );
                })}
            </ul>
            {totalQuestionPages > 1 && (
                <Pagination
                    page={questionPage}
                    setPage={setQuestionPage}
                    totalPages={totalQuestionPages}
                />
            )}
        </>
    );
};

export default QuestionBreakdown;
